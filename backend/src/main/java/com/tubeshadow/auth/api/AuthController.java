package com.tubeshadow.auth.api;

import com.tubeshadow.auth.api.dto.AuthTokenResponse;
import com.tubeshadow.auth.api.dto.ChangePasswordRequest;
import com.tubeshadow.auth.api.dto.DeleteAccountRequest;
import com.tubeshadow.auth.api.dto.LoginRequest;
import com.tubeshadow.auth.api.dto.MeResponse;
import com.tubeshadow.auth.api.dto.SignupRequest;
import com.tubeshadow.auth.api.dto.UpdateProfileRequest;
import com.tubeshadow.auth.application.AuthService;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.auth.security.AuthenticatedUser;
import com.tubeshadow.auth.security.CurrentUser;
import com.tubeshadow.billing.application.AccessPolicy;
import com.tubeshadow.common.exception.NotFoundException;
import com.tubeshadow.common.web.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "회원가입 / 로그인 / 현재 사용자 / 프로필")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final AccessPolicy accessPolicy;

    public AuthController(AuthService authService, UserRepository userRepository,
                          AccessPolicy accessPolicy) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.accessPolicy = accessPolicy;
    }

    @PostMapping("/signup")
    @Operation(summary = "회원가입")
    public ResponseEntity<ApiResponse<AuthTokenResponse>> signup(@Valid @RequestBody SignupRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(authService.signup(request)));
    }

    @PostMapping("/login")
    @Operation(summary = "로그인")
    public ApiResponse<AuthTokenResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.ok(authService.login(request));
    }

    @GetMapping("/me")
    @Operation(summary = "현재 사용자", security = @SecurityRequirement(name = "bearerAuth"))
    public ApiResponse<MeResponse> me(@CurrentUser AuthenticatedUser user) {
        User loaded = userRepository.findById(user.id())
                .orElseThrow(() -> new NotFoundException("USER_NOT_FOUND", "User not found"));
        // effectiveSnapshot, not the raw rows: /me must report what the gates actually decide,
        // including the owner/tester allowlist overlay (§7.4 inspectability).
        return ApiResponse.ok(MeResponse.from(loaded, accessPolicy.effectiveSnapshot(user.id())));
    }

    @PatchMapping("/me")
    @Operation(summary = "프로필 수정 (display name)", security = @SecurityRequirement(name = "bearerAuth"))
    public ApiResponse<AuthTokenResponse> updateProfile(@Valid @RequestBody UpdateProfileRequest request,
                                                        @CurrentUser AuthenticatedUser user) {
        return ApiResponse.ok(authService.updateProfile(user.id(), request));
    }

    @PostMapping("/me/password")
    @Operation(summary = "비밀번호 변경", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request,
                                                @CurrentUser AuthenticatedUser user) {
        authService.changePassword(user.id(), request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/me")
    @Operation(summary = "계정 영구 삭제 (App Store 필수)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<Void> deleteAccount(@Valid @RequestBody DeleteAccountRequest request,
                                               @CurrentUser AuthenticatedUser user) {
        authService.deleteAccount(user.id(), request.password());
        return ResponseEntity.noContent().build();
    }
}
