package com.tubeshadow.clip.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.clip.api.dto.ClipCreateRequest;
import com.tubeshadow.clip.api.dto.ClipPageResponse;
import com.tubeshadow.clip.api.dto.ClipResponse;
import com.tubeshadow.clip.api.dto.ClipUpdateRequest;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.clip.application.ClipService;
import com.tubeshadow.common.web.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/clips")
@Tag(name = "Clip", description = "클립 생성 / 라이브러리 / 조회 / 편집")
@SecurityRequirement(name = "bearerAuth")
@Validated  // enables @Size and friends on @RequestParam/@PathVariable
public class ClipController {

    private final ClipService clipService;
    private final AccessPolicy accessPolicy;

    public ClipController(ClipService clipService, AccessPolicy accessPolicy) {
        this.clipService = clipService;
        this.accessPolicy = accessPolicy;
    }

    @PostMapping
    @Operation(summary = "클립 저장")
    public ResponseEntity<ApiResponse<ClipResponse>> create(@Valid @RequestBody ClipCreateRequest request,
                                                            @CurrentUser AuthenticatedUser user) {
        accessPolicy.requireShadow(user.id());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(clipService.create(user.id(), request)));
    }

    @GetMapping
    @Operation(summary = "클립 목록 (검색/태그/정렬: newest|oldest|name|duration)")
    public ApiResponse<ClipPageResponse> list(
            @CurrentUser AuthenticatedUser user,
            @RequestParam(required = false) @Size(max = 100, message = "검색어는 100자 이하여야 합니다") String q,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false, defaultValue = "newest") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.ok(clipService.list(user.id(), q, tag, sort, page, Math.min(size, 100)));
    }

    @GetMapping("/tags")
    @Operation(summary = "사용자 태그 모음 (정렬, 중복 제거)")
    public ApiResponse<List<String>> tags(@CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(clipService.listUserTags(user.id()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "클립 단건 (자막 포함)")
    public ApiResponse<ClipResponse> get(@PathVariable UUID id,
                                         @CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(clipService.get(user.id(), id));
    }

    @PatchMapping("/{id}")
    @Operation(summary = "클립 편집 (name/tags/transcript 부분 업데이트)")
    public ApiResponse<ClipResponse> update(@PathVariable UUID id,
                                            @Valid @RequestBody ClipUpdateRequest request,
                                            @CurrentUser AuthenticatedUser user) {
        accessPolicy.requireShadow(user.id());
        return ApiResponse.ok(clipService.update(user.id(), id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "클립 삭제 (소유자만)")
    public ResponseEntity<Void> delete(@PathVariable UUID id,
                                       @CurrentUser AuthenticatedUser user) {
        clipService.delete(user.id(), id);
        return ResponseEntity.noContent().build();
    }
}
