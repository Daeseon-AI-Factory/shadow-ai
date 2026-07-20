package com.tubeshadow.library.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.library.api.dto.LibraryVideoPageResponse;
import com.tubeshadow.library.application.LibraryVideoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/library/videos")
@Tag(name = "Library", description = "내가 저장한 영상 (My Videos)")
@SecurityRequirement(name = "bearerAuth")
public class LibraryVideoController {

    private final LibraryVideoService libraryService;
    private final AccessPolicy accessPolicy;

    public LibraryVideoController(LibraryVideoService libraryService, AccessPolicy accessPolicy) {
        this.libraryService = libraryService;
        this.accessPolicy = accessPolicy;
    }

    public record SaveVideoRequest(UUID videoId) {
    }

    @PostMapping
    @Operation(summary = "영상을 내 라이브러리에 저장 (멱등)")
    public ResponseEntity<ApiResponse<Void>> save(@RequestBody SaveVideoRequest request,
                                                  @CurrentUser AuthenticatedUser user) {
        accessPolicy.requireShadow(user.id());
        libraryService.save(user.id(), request.videoId());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(null));
    }

    @GetMapping
    @Operation(summary = "내 영상 목록 (최신순)")
    public ApiResponse<LibraryVideoPageResponse> list(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "30") int size,
                                                      @CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(libraryService.list(user.id(), page, size));
    }

    @DeleteMapping("/{videoId}")
    @Operation(summary = "내 라이브러리에서 영상 제거 (클립은 유지)")
    public ResponseEntity<Void> remove(@PathVariable UUID videoId,
                                       @CurrentUser AuthenticatedUser user) {
        libraryService.remove(user.id(), videoId);
        return ResponseEntity.noContent().build();
    }
}
