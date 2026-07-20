package com.tubeshadow.review.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.review.api.dto.ReviewQueueItem;
import com.tubeshadow.review.api.dto.ReviewRespondRequest;
import com.tubeshadow.review.api.dto.ReviewRespondResponse;
import com.tubeshadow.review.api.dto.StreakResponse;
import com.tubeshadow.review.application.ReviewService;
import com.tubeshadow.review.domain.ReviewItem;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/review")
@Tag(name = "Review", description = "SRS 복습 큐")
@SecurityRequirement(name = "bearerAuth")
public class ReviewController {

    private final ReviewService reviewService;
    private final AccessPolicy accessPolicy;

    public ReviewController(ReviewService reviewService, AccessPolicy accessPolicy) {
        this.reviewService = reviewService;
        this.accessPolicy = accessPolicy;
    }

    @GetMapping("/queue")
    @Operation(summary = "오늘 due 복습 큐 (지난 due 우선, 옵션: deckId 또는 'INBOX')")
    public ApiResponse<List<ReviewQueueItem>> queue(
            @CurrentUser AuthenticatedUser user,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) String deckId) {
        LocalDate cutoff = date == null ? LocalDate.now() : date;
        return ApiResponse.ok(reviewService.queue(user.id(), cutoff, deckId));
    }

    @PostMapping("/items/{id}/respond")
    @Operation(summary = "복습 응답 (quality 0..5)")
    public ApiResponse<ReviewRespondResponse> respond(@PathVariable UUID id,
                                                       @Valid @RequestBody ReviewRespondRequest request,
                                                       @CurrentUser AuthenticatedUser user) {
        accessPolicy.requireShadow(user.id());
        ReviewItem updated = reviewService.respond(user.id(), id, request.quality());
        return ApiResponse.ok(ReviewRespondResponse.from(updated));
    }

    @GetMapping("/streak")
    @Operation(summary = "오늘 due 개수 + 연속 일수")
    public ApiResponse<StreakResponse> streak(@CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(reviewService.streak(user.id()));
    }
}
