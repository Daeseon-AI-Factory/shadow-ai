package com.tubeshadow.practice.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * Request to mint a realtime sparring session. Targets are the learner's due SRS cards —
 * the pack content lives on the client, the server only ever sees the few chunks to elicit.
 */
public record SparringSessionRequest(
        @Pattern(regexp = "chat|interview") String mode,
        @Valid @Size(max = 12) List<Target> targets
) {
    public record Target(@NotBlank @Size(max = 80) String label, @Size(max = 120) String ko) {}
}
