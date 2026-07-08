package com.tubeshadow.practice.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.prompt.SparringPrompt;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Mints short-lived OpenAI Realtime client secrets for voice sparring sessions.
 * The raw OPENAI_API_KEY never leaves the server — the app only ever receives the
 * ephemeral secret (single session, expires in minutes), which it uses to open a
 * WebRTC call DIRECTLY to OpenAI (audio does not flow through this backend at all).
 */
@Component
@EnableConfigurationProperties(SparringProperties.class)
public class SparringClient {

    private final SparringProperties props;
    private final ObjectMapper objectMapper;
    private final RestClient http;

    public SparringClient(SparringProperties props, ObjectMapper objectMapper) {
        this.props = props;
        this.objectMapper = objectMapper;
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(20));
        this.http = RestClient.builder().requestFactory(factory).baseUrl(props.baseUrl()).build();
    }

    public boolean isConfigured() {
        return props.apiKey() != null && !props.apiKey().isBlank();
    }

    /** Mint an ephemeral session secret; returns [clientSecret, model]. */
    public MintedSession mintSession(String mode, List<SparringPrompt.Target> targets) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "SPARRING_NOT_CONFIGURED",
                    "실시간 스파링이 설정되지 않았습니다 (OpenAI API 키 필요)");
        }
        Map<String, Object> session = new LinkedHashMap<>();
        session.put("type", "realtime");
        session.put("model", props.model());
        session.put("instructions", SparringPrompt.build(mode, targets));
        session.put("audio", Map.of(
                "input", Map.of(
                        "transcription", Map.of("model", "gpt-4o-mini-transcribe"),
                        "turn_detection", turnDetection(mode)),
                "output", Map.of("voice", props.voice())));

        String raw;
        try {
            raw = http.post()
                    .uri("/v1/realtime/client_secrets")
                    .header("Authorization", "Bearer " + props.apiKey())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("session", session))
                    .retrieve()
                    .body(String.class);
        } catch (Exception e) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "SPARRING_MINT_FAILED",
                    "스파링 세션 발급에 실패했습니다: " + e.getMessage());
        }
        try {
            JsonNode json = objectMapper.readTree(raw);
            String secret = json.path("value").asText("");
            if (secret.isBlank()) {
                throw new IllegalStateException("no client secret in response");
            }
            return new MintedSession(secret, props.model());
        } catch (Exception e) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "SPARRING_MINT_FAILED",
                    "스파링 세션 응답을 해석하지 못했습니다");
        }
    }

    /**
     * Turn-taking profile per mode. Chat pounces 250ms after silence (feels like a quick friend);
     * interview waits 800ms so an ESL candidate can organize long answers without being cut off.
     */
    public static Map<String, Object> turnDetection(String mode) {
        boolean interview = "interview".equals(mode);
        Map<String, Object> td = new LinkedHashMap<>();
        td.put("type", "server_vad");
        td.put("threshold", 0.5);
        td.put("prefix_padding_ms", interview ? 300 : 200);
        td.put("silence_duration_ms", interview ? 800 : 250);
        td.put("create_response", true);
        td.put("interrupt_response", true);
        return td;
    }

    public record MintedSession(String clientSecret, String model) {}
}
