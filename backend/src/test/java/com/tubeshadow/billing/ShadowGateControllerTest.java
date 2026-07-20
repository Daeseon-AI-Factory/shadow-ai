package com.tubeshadow.billing;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.clip.api.ClipController;
import com.tubeshadow.clip.application.ClipService;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.deck.api.DeckController;
import com.tubeshadow.deck.application.DeckService;
import com.tubeshadow.library.api.LibraryVideoController;
import com.tubeshadow.library.application.LibraryVideoService;
import com.tubeshadow.recording.api.RecordingController;
import com.tubeshadow.recording.application.RecordingService;
import com.tubeshadow.review.api.ReviewController;
import com.tubeshadow.review.application.ReviewService;
import com.tubeshadow.video.api.VideoController;
import com.tubeshadow.video.application.VideoImportService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;

/**
 * PAY-1 gate-placement proof (docs/MONETIZATION-DESIGN.md §7.2): every paid-workflow WRITE calls
 * AccessPolicy.requireShadow BEFORE touching its service. Each endpoint is invoked with a denied
 * policy and a null body — if the gate were placed after any work, the null would NPE or the
 * service mock would record an interaction, so a passing test pins "gate first, always".
 */
class ShadowGateControllerTest {

    private final AccessPolicy denied = mock(AccessPolicy.class);
    private final AuthenticatedUser user = new AuthenticatedUser(UUID.randomUUID(), "free@example.com", 0);

    private ShadowGateControllerTest denyShadow() {
        doThrow(new BusinessException(HttpStatus.FORBIDDEN, AccessPolicy.CODE_SHADOW_REQUIRED, "blocked"))
                .when(denied).requireShadow(any());
        return this;
    }

    @Test
    void clipCreateAndUpdateAreGated() {
        denyShadow();
        ClipService clips = mock(ClipService.class);
        ClipController controller = new ClipController(clips, denied);

        assertBlocked(() -> controller.create(null, user));
        assertBlocked(() -> controller.update(UUID.randomUUID(), null, user));
        verifyNoInteractions(clips);
    }

    @Test
    void recordingUploadIsGated() {
        denyShadow();
        RecordingService recordings = mock(RecordingService.class);
        RecordingController controller = new RecordingController(recordings, denied);

        assertBlocked(() -> controller.upload(UUID.randomUUID(), null, 1000L, user));
        verifyNoInteractions(recordings);
    }

    @Test
    void reviewGradingIsGated() {
        denyShadow();
        ReviewService reviews = mock(ReviewService.class);
        ReviewController controller = new ReviewController(reviews, denied);

        assertBlocked(() -> controller.respond(UUID.randomUUID(), null, user));
        verifyNoInteractions(reviews);
    }

    @Test
    void deckOrganizationWritesAreGated() {
        denyShadow();
        DeckService decks = mock(DeckService.class);
        ClipRepository clipRepository = mock(ClipRepository.class);
        DeckController controller = new DeckController(decks, clipRepository, denied);

        assertBlocked(() -> controller.create(null, user));
        assertBlocked(() -> controller.rename(UUID.randomUUID(), null, user));
        assertBlocked(() -> controller.moveClip(UUID.randomUUID(), null, user));
        verifyNoInteractions(decks);
    }

    @Test
    void librarySaveIsGated() {
        denyShadow();
        LibraryVideoService library = mock(LibraryVideoService.class);
        LibraryVideoController controller = new LibraryVideoController(library, denied);

        assertBlocked(() -> controller.save(null, user));
        verifyNoInteractions(library);
    }

    @Test
    void videoImportIsGatedBecauseItCanSpendVendorCredits() {
        denyShadow();
        VideoImportService imports = mock(VideoImportService.class);
        LibraryVideoService library = mock(LibraryVideoService.class);
        VideoController controller = new VideoController(imports, library, denied);

        assertBlocked(() -> controller.importVideo(null, user));
        verifyNoInteractions(imports);
        verifyNoInteractions(library);
    }

    private void assertBlocked(org.assertj.core.api.ThrowableAssert.ThrowingCallable call) {
        assertThatThrownBy(call)
                .isInstanceOf(BusinessException.class)
                .satisfies(e -> org.assertj.core.api.Assertions.assertThat(
                        ((BusinessException) e).code()).isEqualTo(AccessPolicy.CODE_SHADOW_REQUIRED));
        Mockito.verify(denied, Mockito.atLeastOnce()).requireShadow(user.id());
    }
}
