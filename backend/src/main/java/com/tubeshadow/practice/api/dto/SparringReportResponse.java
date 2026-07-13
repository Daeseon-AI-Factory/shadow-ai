package com.tubeshadow.practice.api.dto;

import java.util.List;

/** Read-only report; missed target keys are echoed so the client can submit its own SRS grades. */
public record SparringReportResponse(
        List<Target> usedTargets,
        List<Target> missedTargets,
        List<Correction> corrections,
        List<String> recurringMistakes
) {
    public record Target(String cardKey, String label, String ko) {
    }

    public record Correction(String original, String corrected, String explanation) {
    }
}
