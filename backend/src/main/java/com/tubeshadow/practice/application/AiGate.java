package com.tubeshadow.practice.application;

import com.tubeshadow.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Single access gate for every AI-backed endpoint (drill grading, transcription, realtime
 * sparring — anything that calls a paid/quota'd model). One switch: AI_ALLOWED_EMAILS.
 *
 * DENY-BY-DEFAULT — a blank allowlist blocks everyone, so opening the app to the public can't
 * quietly run up an AI bill. Non-AI features (YouTube shadowing, drills, SRS) never call this.
 */
@Component
public class AiGate {

    private final Set<String> allowed;

    public AiGate(@Value("${AI_ALLOWED_EMAILS:}") String allowedEmails) {
        this.allowed = (allowedEmails == null || allowedEmails.isBlank())
                ? Set.of()
                : Arrays.stream(allowedEmails.split(","))
                    .map(s -> s.trim().toLowerCase())
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toUnmodifiableSet());
    }

    /** Throw 403 unless the caller's email is on the allowlist. */
    public void assertAllowed(String email) {
        if (allowed.isEmpty() || email == null || !allowed.contains(email.trim().toLowerCase())) {
            throw new BusinessException(HttpStatus.FORBIDDEN, "AI_NOT_ALLOWED",
                    "AI 기능은 현재 지정된 사용자만 이용할 수 있습니다.");
        }
    }
}
