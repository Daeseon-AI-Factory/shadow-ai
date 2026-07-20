package com.tubeshadow.recording.api;

import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.common.web.ApiResponse;
import com.tubeshadow.recording.api.dto.RecordingResponse;
import com.tubeshadow.recording.application.RecordingService;
import com.tubeshadow.recording.domain.Recording;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "Recording", description = "녹음 업로드 / 조회 / 스트리밍 / 삭제")
@SecurityRequirement(name = "bearerAuth")
public class RecordingController {

    private final RecordingService recordingService;
    private final AccessPolicy accessPolicy;

    public RecordingController(RecordingService recordingService, AccessPolicy accessPolicy) {
        this.recordingService = recordingService;
        this.accessPolicy = accessPolicy;
    }

    @PostMapping(value = "/api/clips/{clipId}/recordings", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "녹음 업로드")
    public ResponseEntity<ApiResponse<RecordingResponse>> upload(
            @PathVariable UUID clipId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("durationMs") long durationMs,
            @CurrentUser AuthenticatedUser user) {
        accessPolicy.requireShadow(user.id());
        Recording saved = recordingService.upload(user.id(), clipId, file, durationMs);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(RecordingResponse.from(saved)));
    }

    @GetMapping("/api/clips/{clipId}/recordings")
    @Operation(summary = "클립 녹음 목록 (시간순)")
    public ApiResponse<List<RecordingResponse>> list(@PathVariable UUID clipId,
                                                     @CurrentUser AuthenticatedUser user) {
        List<RecordingResponse> items = recordingService.listByClip(user.id(), clipId).stream()
                .map(RecordingResponse::from).toList();
        return ApiResponse.ok(items);
    }

    @GetMapping("/api/recordings/{id}/audio")
    @Operation(summary = "녹음 오디오 스트리밍")
    public ResponseEntity<InputStreamResource> stream(@PathVariable UUID id,
                                                      @CurrentUser AuthenticatedUser user) {
        Recording recording = recordingService.getOwned(user.id(), id);
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, recording.getContentType() != null ? recording.getContentType() : "audio/webm");
        headers.setContentLength(recording.getSizeBytes());
        headers.set(HttpHeaders.CACHE_CONTROL, "private, max-age=3600");
        return new ResponseEntity<>(new InputStreamResource(recordingService.openAudioStream(recording)),
                headers, HttpStatus.OK);
    }

    @DeleteMapping("/api/recordings/{id}")
    @Operation(summary = "녹음 삭제 (소유자만)")
    public ResponseEntity<Void> delete(@PathVariable UUID id,
                                       @CurrentUser AuthenticatedUser user) {
        recordingService.delete(user.id(), id);
        return ResponseEntity.noContent().build();
    }
}
