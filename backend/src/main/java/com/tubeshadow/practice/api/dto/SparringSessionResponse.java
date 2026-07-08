package com.tubeshadow.practice.api.dto;

/** Ephemeral OpenAI Realtime credential — safe to hand to the app (single session, short TTL). */
public record SparringSessionResponse(String clientSecret, String model) {
}
