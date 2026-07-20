package com.tubeshadow.analysis.application;

import com.tubeshadow.analysis.domain.ClipAnalysis;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.analysis.infrastructure.AiAnalysisResult;
import com.tubeshadow.analysis.repository.ClipAnalysisRepository;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.clip.application.ClipCreatedEvent;
import com.tubeshadow.clip.application.ClipDeletedEvent;
import com.tubeshadow.clip.domain.Clip;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.NotFoundException;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.UUID;

/**
 * <p>Async pipeline: when a clip is committed, a background thread runs the AI provider
 * call <em>outside</em> any DB transaction (HTTP can take seconds, we must not
 * pin a Hikari connection that long). Only the small bookend writes — create
 * PENDING, then mark READY/FAILED — are wrapped in short transactions.
 *
 * <p>Self-invocation note: {@code @Async} and {@code @Transactional} on internal
 * methods are bypassed when called via {@code this.}. All cross-method calls go
 * through {@code self} (a self-injected proxy) so the proxy advice runs.
 */
@Service
public class ClipAnalysisService {

    private static final Logger log = LoggerFactory.getLogger(ClipAnalysisService.class);

    private final ClipRepository clipRepository;
    private final ClipAnalysisRepository analysisRepository;
    private final AiAnalysisClient aiClient;
    private final MeterRegistry meterRegistry;
    private final AccessPolicy accessPolicy;
    private final org.springframework.beans.factory.ObjectProvider<ClipAnalysisService> selfProvider;

    public ClipAnalysisService(ClipRepository clipRepository,
                               ClipAnalysisRepository analysisRepository,
                               AiAnalysisClient aiClient,
                               MeterRegistry meterRegistry,
                               AccessPolicy accessPolicy,
                               org.springframework.beans.factory.ObjectProvider<ClipAnalysisService> selfProvider) {
        this.clipRepository = clipRepository;
        this.analysisRepository = analysisRepository;
        this.aiClient = aiClient;
        this.meterRegistry = meterRegistry;
        this.accessPolicy = accessPolicy;
        this.selfProvider = selfProvider;
    }

    private ClipAnalysisService self() {
        return selfProvider.getObject();
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Async
    public void onClipCreated(ClipCreatedEvent event) {
        // PAY-1 (docs/MONETIZATION-DESIGN.md §7.3): automatic analysis is a model cost and must not
        // run for users without AI access. Deliberately NO analysis row is created — a Shadow user
        // must never see an eternal PENDING spinner, and reads keep returning ANALYSIS_NOT_FOUND.
        if (!accessPolicy.canUseAi(event.userId())) {
            log.info("Skip auto-analysis for clip {}: user {} has no AI access", event.clipId(), event.userId());
            return;
        }
        runAnalysisPipeline(event.clipId());
    }

    @EventListener
    @Transactional
    public void onClipDeleted(ClipDeletedEvent event) {
        analysisRepository.deleteByClipId(event.clipId());
    }

    /**
     * Pipeline entrypoint — runs on the @Async pool. Bookends are transactional,
     * the network call in between is not.
     */
    public void runAnalysisPipeline(UUID clipId) {
        // 1. Load clip + ensure a PENDING row exists (short tx).
        TranscriptSnapshot snapshot;
        try {
            snapshot = self().prepareAnalysis(clipId);
        } catch (NotFoundException ex) {
            log.debug("Skip analysis: clip {} no longer exists", clipId);
            return;
        }

        if (snapshot.transcript == null || snapshot.transcript.isBlank()) {
            self().completeWithEmptyTranscript(clipId);
            return;
        }
        if (!aiClient.isConfigured()) {
            log.info("AI provider key absent — skipping analysis for clip {}", clipId);
            self().completeAsFailed(clipId, "AI provider key not configured");
            return;
        }

        // 2. Call the AI provider OUTSIDE the transaction. Slow, network-bound.
        //    Timed via Micrometer (latency + success/failure rate, tagged by model) so the
        //    AI path is observable in /actuator/prometheus.
        AiAnalysisResult result;
        Timer.Sample sample = Timer.start(meterRegistry);
        try {
            result = aiClient.analyzeClip(snapshot.transcript);
            sample.stop(meterRegistry.timer("tubeshadow.ai.analysis",
                    "model", aiClient.model(), "outcome", "success"));
        } catch (Exception ex) {
            sample.stop(meterRegistry.timer("tubeshadow.ai.analysis",
                    "model", aiClient.model(), "outcome", "failure"));
            log.warn("Analysis failed for clip {}: {}", clipId, ex.getMessage());
            self().completeAsFailed(clipId, ex.getMessage());
            return;
        }

        // 3. Persist result (short tx).
        self().completeAsReady(clipId, result);
    }

    @Transactional
    public TranscriptSnapshot prepareAnalysis(UUID clipId) {
        Clip clip = clipRepository.findById(clipId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "Clip not found"));
        if (analysisRepository.findByClipId(clipId).isEmpty()) {
            analysisRepository.save(ClipAnalysis.pending(clipId));
        }
        return new TranscriptSnapshot(clip.getTranscript());
    }

    @Transactional
    public void completeWithEmptyTranscript(UUID clipId) {
        ClipAnalysis analysis = analysisRepository.findByClipId(clipId)
                .orElseGet(() -> ClipAnalysis.pending(clipId));
        analysis.markReady(java.util.List.of(), java.util.List.of(), java.util.List.of(),
                "Transcript unavailable.", null, java.util.List.of(), null, java.util.List.of(), aiClient.model());
        analysisRepository.save(analysis);
    }

    @Transactional
    public void completeAsFailed(UUID clipId, String message) {
        analysisRepository.findByClipId(clipId).ifPresent(a -> {
            a.markFailed(message);
            analysisRepository.save(a);
        });
    }

    @Transactional
    public void completeAsReady(UUID clipId, AiAnalysisResult result) {
        analysisRepository.findByClipId(clipId).ifPresent(a -> {
            a.markReady(result.grammarNotes(), result.keyExpressions(),
                    result.vocabulary(), result.contextSummary(),
                    result.primaryTranslation(), result.chunkedTranslation(),
                    result.practiceScenario(), result.prepositionNotes(), aiClient.model());
            analysisRepository.save(a);
        });
    }

    @Transactional
    public ClipAnalysis regenerate(UUID userId, UUID clipId) {
        // PAY-1: regeneration re-commits a model cost — gate it BEFORE deleting anything (§7.3).
        accessPolicy.requireAi(userId);
        Clip clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "Clip not found"));
        analysisRepository.deleteByClipId(clipId);
        analysisRepository.flush();
        ClipAnalysis fresh = analysisRepository.save(ClipAnalysis.pending(clip.getId()));
        // Fire via proxy so @Async kicks in.
        self().runAnalysisPipelineAsync(clipId);
        return fresh;
    }

    /** Async hop — must be invoked via the proxy ({@link #self()}). */
    @Async
    public void runAnalysisPipelineAsync(UUID clipId) {
        runAnalysisPipeline(clipId);
    }

    @Transactional(readOnly = true)
    public ClipAnalysis getForUser(UUID userId, UUID clipId) {
        Clip clip = clipRepository.findByIdAndUserId(clipId, userId)
                .orElseThrow(() -> new NotFoundException("CLIP_NOT_FOUND", "Clip not found"));
        return analysisRepository.findByClipId(clip.getId())
                .orElseThrow(() -> new NotFoundException("ANALYSIS_NOT_FOUND", "Analysis not started"));
    }

    record TranscriptSnapshot(String transcript) {}
}
