package com.tubeshadow.practice;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.practice.api.PracticeController;
import com.tubeshadow.practice.api.dto.ComposeCheckRequest;
import com.tubeshadow.practice.api.dto.ComposeFeedback;
import com.tubeshadow.practice.api.dto.SparringSessionRequest;
import com.tubeshadow.practice.application.AiGate;
import com.tubeshadow.practice.application.CompositionService;
import com.tubeshadow.practice.application.PracticeProgressService;
import com.tubeshadow.practice.application.PracticeSrsService;
import com.tubeshadow.practice.application.SeedService;
import com.tubeshadow.practice.application.TransformService;
import com.tubeshadow.practice.infrastructure.SparringClient;
import com.tubeshadow.practice.infrastructure.TranscriptionClient;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class PracticeControllerEntitlementTest {

    private final CompositionService composition = mock(CompositionService.class);
    private final SparringClient sparring = mock(SparringClient.class);
    private final AiGate gate = mock(AiGate.class);
    private final AccessPolicy accessPolicy = mock(AccessPolicy.class);
    private final PracticeProgressService progressService = mock(PracticeProgressService.class);
    private final PracticeSrsService srsService = mock(PracticeSrsService.class);
    private final PracticeController controller = new PracticeController(
            progressService,
            srsService,
            composition,
            mock(TransformService.class),
            mock(SeedService.class),
            mock(TranscriptionClient.class),
            sparring,
            gate,
            accessPolicy);
    private final AuthenticatedUser user = new AuthenticatedUser(
            UUID.fromString("12345678-1234-1234-1234-123456789abc"), "stale-token@example.com", 0);

    @Test
    void generalAiEndpointUsesTheUserIdEntitlementGate() {
        ComposeCheckRequest request = new ComposeCheckRequest(
                "depend on", "rely on", "It depends on traffic.");
        ComposeFeedback feedback = new ComposeFeedback(true, true, "natural", "");
        when(composition.check(request.target(), request.gloss(), request.sentence())).thenReturn(feedback);

        assertThat(controller.composeCheck(user, request).data()).isSameAs(feedback);

        verify(gate).assertEntitled(user.id());
    }

    @Test
    void realtimeSparringUsesTheSameUserIdEntitlementGate() {
        when(sparring.mintSession("chat", List.of()))
                .thenReturn(new SparringClient.MintedSession("ephemeral", "gpt-realtime"));

        var response = controller.sparringSession(
                user, new SparringSessionRequest("chat", List.of())).data();

        assertThat(response.clientSecret()).isEqualTo("ephemeral");
        verify(gate).assertEntitled(user.id());
    }

    @Test
    void practiceProgressionWritesUseTheShadowGate() {
        controller.rep(user, null);

        verify(accessPolicy).requireShadow(user.id());
        verify(progressService).recordRep(org.mockito.ArgumentMatchers.eq(user.id()),
                org.mockito.ArgumentMatchers.any());
    }

    @Test
    void srsGradingUsesTheShadowGate() {
        controller.grade(user, new com.tubeshadow.practice.api.dto.GradeRequest(
                "pat:on-depend-on#0", true, java.time.LocalDate.parse("2026-01-10")));

        verify(accessPolicy).requireShadow(user.id());
        verify(srsService).grade(user.id(), "pat:on-depend-on#0", true,
                java.time.LocalDate.parse("2026-01-10"));
    }
}
