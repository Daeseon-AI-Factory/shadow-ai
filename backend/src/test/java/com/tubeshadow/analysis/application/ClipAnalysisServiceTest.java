package com.tubeshadow.analysis.application;

import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.analysis.infrastructure.AiAnalysisResult;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.clip.application.ClipCreatedEvent;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.BusinessException;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Unit tests for the signature async-analysis pipeline. Drives runAnalysisPipeline
 * synchronously (the @Async hop is bypassed) with mocked collaborators; the self-proxy is
 * stubbed to return the instance so the transactional bookend methods run in-process.
 */
class ClipAnalysisServiceTest {

    private ClipRepository clipRepo;
    private ClipAnalysisRepository analysisRepo;
    private AiAnalysisClient aiClient;
    private AccessPolicy accessPolicy;
    private ClipAnalysisService service;

    @BeforeEach
    @SuppressWarnings("unchecked")
    void setUp() {
        clipRepo = mock(ClipRepository.class);
        analysisRepo = mock(ClipAnalysisRepository.class);
        aiClient = mock(AiAnalysisClient.class);
        accessPolicy = mock(AccessPolicy.class);
        when(aiClient.model()).thenReturn("gemini-2.5-flash");
        ObjectProvider<ClipAnalysisService> selfProvider = mock(ObjectProvider.class);
        service = new ClipAnalysisService(clipRepo, analysisRepo, aiClient, new SimpleMeterRegistry(),
                accessPolicy, selfProvider);
        when(selfProvider.getObject()).thenReturn(service);
    }

    @Test
    void readyPathCallsProviderAndMarksReady() {
        UUID clipId = UUID.randomUUID();
        Clip clip = mock(Clip.class);
        when(clip.getTranscript()).thenReturn("we spin up a server");
        when(clipRepo.findById(clipId)).thenReturn(Optional.of(clip));
        ClipAnalysis analysis = ClipAnalysis.pending(clipId);
        when(analysisRepo.findByClipId(clipId)).thenReturn(Optional.of(analysis));
        when(aiClient.isConfigured()).thenReturn(true);
        when(aiClient.analyzeClip("we spin up a server")).thenReturn(
                new AiAnalysisResult(List.of("g"), List.of(), List.of(), "summary", null, List.of(), null, List.of()));

        service.runAnalysisPipeline(clipId);

        verify(aiClient).analyzeClip("we spin up a server");
        assertThat(analysis.getStatus()).isEqualTo(ClipAnalysis.AnalysisStatus.READY);
    }

    @Test
    void notConfiguredMarksFailedWithoutCallingProvider() {
        UUID clipId = UUID.randomUUID();
        Clip clip = mock(Clip.class);
        when(clip.getTranscript()).thenReturn("hello");
        when(clipRepo.findById(clipId)).thenReturn(Optional.of(clip));
        ClipAnalysis analysis = ClipAnalysis.pending(clipId);
        when(analysisRepo.findByClipId(clipId)).thenReturn(Optional.of(analysis));
        when(aiClient.isConfigured()).thenReturn(false);

        service.runAnalysisPipeline(clipId);

        verify(aiClient, never()).analyzeClip(any());
        assertThat(analysis.getStatus()).isEqualTo(ClipAnalysis.AnalysisStatus.FAILED);
    }

    @Test
    void missingClipShortCircuitsQuietly() {
        UUID clipId = UUID.randomUUID();
        when(clipRepo.findById(clipId)).thenReturn(Optional.empty());

        service.runAnalysisPipeline(clipId);

        verify(aiClient, never()).analyzeClip(any());
    }

    @Test
    void autoAnalysisSkipsEntirelyWhenTheUserHasNoAiAccess() {
        UUID clipId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        when(accessPolicy.canUseAi(userId)).thenReturn(false);

        service.onClipCreated(new ClipCreatedEvent(clipId, userId, "transcript"));

        // No model call AND no PENDING row — a Shadow user must never see an eternal spinner (§7.3).
        verify(aiClient, never()).analyzeClip(any());
        verify(analysisRepo, never()).save(any());
    }

    @Test
    void autoAnalysisRunsWhenTheUserHasAiAccess() {
        UUID clipId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        when(accessPolicy.canUseAi(userId)).thenReturn(true);
        Clip clip = mock(Clip.class);
        when(clip.getTranscript()).thenReturn("we spin up a server");
        when(clipRepo.findById(clipId)).thenReturn(Optional.of(clip));
        ClipAnalysis analysis = ClipAnalysis.pending(clipId);
        when(analysisRepo.findByClipId(clipId)).thenReturn(Optional.of(analysis));
        when(aiClient.isConfigured()).thenReturn(true);
        when(aiClient.analyzeClip("we spin up a server")).thenReturn(
                new AiAnalysisResult(List.of("g"), List.of(), List.of(), "summary", null, List.of(), null, List.of()));

        service.onClipCreated(new ClipCreatedEvent(clipId, userId, "we spin up a server"));

        verify(aiClient).analyzeClip("we spin up a server");
    }

    @Test
    void regenerateIsGatedBeforeDeletingTheExistingAnalysis() {
        UUID clipId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        doThrow(new BusinessException(org.springframework.http.HttpStatus.FORBIDDEN,
                "AI_NOT_ALLOWED", "blocked")).when(accessPolicy).requireAi(userId);

        assertThatThrownBy(() -> service.regenerate(userId, clipId))
                .isInstanceOf(BusinessException.class);

        verify(analysisRepo, never()).deleteByClipId(any());
        verify(aiClient, never()).analyzeClip(any());
    }
}
