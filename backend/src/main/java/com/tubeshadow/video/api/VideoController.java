package com.tubeshadow.video.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.library.application.LibraryVideoService;
import com.tubeshadow.video.api.dto.VideoImportRequest;
import com.tubeshadow.video.api.dto.VideoResponse;
import com.tubeshadow.video.application.VideoImportService;
import com.tubeshadow.video.domain.Video;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/videos")
@Tag(name = "Video", description = "YouTube 영상 임포트 / 조회")
@SecurityRequirement(name = "bearerAuth")
public class VideoController {

    private final VideoImportService importService;
    private final LibraryVideoService libraryService;
    private final AccessPolicy accessPolicy;

    public VideoController(VideoImportService importService, LibraryVideoService libraryService,
                           AccessPolicy accessPolicy) {
        this.importService = importService;
        this.libraryService = libraryService;
        this.accessPolicy = accessPolicy;
    }

    @PostMapping("/import")
    @Operation(summary = "YouTube URL 임포트 (Shadow — 자막 경로가 유료 벤더 비용을 쓸 수 있음)")
    public ApiResponse<VideoResponse> importVideo(@Valid @RequestBody VideoImportRequest request,
                                                  @CurrentUser AuthenticatedUser user) {
        // PAY-1 (docs/MONETIZATION-DESIGN.md §7.2): import is a metered cost boundary — the
        // transcript fetch can fall back to the paid Supadata vendor. Shadow by default (§0.1).
        accessPolicy.requireShadow(user.id());
        Video video = importService.importByUrl(request.url(), request.transcriptSegments(), request.title());
        // Every import lands in the user's library automatically (zero-friction "save"); idempotent.
        libraryService.save(user.id(), video.getId());
        return ApiResponse.ok(VideoResponse.from(video));
    }

    @GetMapping("/{id}")
    @Operation(summary = "영상 + 자막 조회")
    public ApiResponse<VideoResponse> getVideo(@PathVariable UUID id,
                                               @CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(VideoResponse.from(importService.getOrThrow(id)));
    }
}
