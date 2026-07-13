package com.tubeshadow.practice.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

/** The mock-interview dialog so far; empty history asks for the opening question. */
public record MockNextRequest(
        @Size(max = 40) List<@NotNull @Valid Turn> history,
        Long seed,
        @Size(max = 12000) String jobDescription) {

    public record Turn(
            @Size(max = 20) String role, // "interviewer" | "candidate"
            @Size(max = 4000) String text) {
    }
}
