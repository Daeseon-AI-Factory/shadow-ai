package com.tubeshadow.practice.application;

import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Instant;
import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Single access gate for every AI-backed endpoint (drill grading, transcription, realtime
 * sparring — anything that calls a paid/quota'd model). Paid plans are entitled; AI_ALLOWED_EMAILS
 * remains a narrow owner/tester override.
 *
 * DENY-BY-DEFAULT — a missing user, free plan, or expired plan is blocked. Non-AI features
 * (YouTube shadowing, drills, SRS) never call this gate.
 */
@Component
public class AiGate {

    private final UserRepository userRepository;
    private final Set<String> allowed;
    private final Clock clock;

    @Autowired
    public AiGate(UserRepository userRepository,
                  @Value("${AI_ALLOWED_EMAILS:}") String allowedEmails) {
        this(userRepository, allowedEmails, Clock.systemUTC());
    }

    public AiGate(UserRepository userRepository, String allowedEmails, Clock clock) {
        this.userRepository = userRepository;
        this.allowed = (allowedEmails == null || allowedEmails.isBlank())
                ? Set.of()
                : Arrays.stream(allowedEmails.split(","))
                    .map(s -> s.trim().toLowerCase())
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toUnmodifiableSet());
        this.clock = clock;
    }

    /** Throw 403 unless the current DB user has a paid plan or matches the owner/tester override. */
    public void assertEntitled(UUID userId) {
        User user = userId == null ? null : userRepository.findById(userId).orElse(null);
        if (user != null) {
            String email = user.getEmail();
            boolean allowlistOverride = email != null && allowed.contains(email.trim().toLowerCase());
            boolean paidPlan = !"free".equals(user.effectivePlan(Instant.now(clock)));
            if (allowlistOverride || paidPlan) {
                return;
            }
        }
        throw new BusinessException(HttpStatus.FORBIDDEN, "AI_NOT_ALLOWED",
                "AI 기능은 유료 플랜에서 이용할 수 있습니다.");
    }
}
