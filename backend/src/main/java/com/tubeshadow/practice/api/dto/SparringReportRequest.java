package com.tubeshadow.practice.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * End-of-session learner transcript plus the exact client-owned SRS targets used for the session.
 * The backend analyzes this payload but never writes SRS state; the client owns grading by card key.
 */
public record SparringReportRequest(
        @NotEmpty @Size(max = 40)
        List<@NotBlank @Size(max = 2000) String> userTurns,
        @NotEmpty @Size(max = 12) List<@NotNull @Valid Target> targets
) {
    public record Target(
            @NotBlank @Size(max = 120) String cardKey,
            @NotBlank @Size(max = 80) String label,
            @Size(max = 120) String ko
    ) {
    }
}
