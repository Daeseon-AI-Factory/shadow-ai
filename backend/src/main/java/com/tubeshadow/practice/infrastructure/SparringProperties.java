package com.tubeshadow.practice.infrastructure;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Realtime voice sparring config. Defaults to OpenAI gpt-realtime (native speech-to-speech —
 * no STT→LLM→TTS chain, so sub-second turn latency and barge-in). Point model at
 * gpt-realtime-mini via SPARRING_MODEL to trade some quality for ~1/3 the per-minute cost.
 */
@ConfigurationProperties(prefix = "tubeshadow.sparring")
public record SparringProperties(String apiKey, String baseUrl, String model, String voice) {
}
