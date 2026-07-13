package com.tubeshadow.analysis.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.prompt.ClipAnalysisPrompt;
import com.tubeshadow.common.exception.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Component
@EnableConfigurationProperties(ClaudeProperties.class)
public class ClaudeClient implements AiAnalysisClient {

    private static final Logger log = LoggerFactory.getLogger(ClaudeClient.class);

    private final ClaudeProperties props;
    private final ObjectMapper objectMapper;
    private final RestClient http;

    public ClaudeClient(ClaudeProperties props, ObjectMapper objectMapper) {
        this.props = props;
        this.objectMapper = objectMapper;
        // See GeminiClient: bound connect/read so a stalled provider can't pin an
        // @Async analysis thread forever. On timeout the pipeline marks FAILED.
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(10));
        factory.setReadTimeout(Duration.ofSeconds(60));
        this.http = RestClient.builder()
                .requestFactory(factory)
                .baseUrl(props.baseUrl())
                .defaultHeader("anthropic-version", "2023-06-01")
                .defaultHeader("content-type", "application/json")
                .build();
    }

    @Override
    public boolean isConfigured() {
        return props.apiKey() != null && !props.apiKey().isBlank();
    }

    @Override
    public AiAnalysisResult analyzeClip(String transcript) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "CLAUDE_NOT_CONFIGURED",
                    "Anthropic API key가 설정되지 않았습니다");
        }

        // System message uses cache_control so the prompt itself is billed once per 5-minute window.
        Map<String, Object> body = Map.of(
                "model", props.model(),
                "max_tokens", 800,
                "system", List.of(Map.of(
                        "type", "text",
                        "text", ClipAnalysisPrompt.SYSTEM,
                        "cache_control", Map.of("type", "ephemeral")
                )),
                "messages", List.of(Map.of(
                        "role", "user",
                        "content", List.of(Map.of(
                                "type", "text",
                                "text", ClipAnalysisPrompt.userMessage(transcript)
                        ))
                ))
        );

        String raw;
        try {
            // Retry transient failures (429 / 5xx / timeout); permanent errors fail fast.
            raw = AiRetry.withRetry("Claude", () -> http.post()
                    .uri("/v1/messages")
                    .header("x-api-key", props.apiKey())
                    .body(body)
                    .retrieve()
                    .body(String.class));
        } catch (Exception ex) {
            log.error("Claude API call failed", ex);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "CLAUDE_CALL_FAILED",
                    "Claude 호출 실패: " + ex.getMessage());
        }

        return parseResponse(raw);
    }

    /** Claude Messages API shape: the text blocks in content[] concatenated → our JSON string. */
    public AiAnalysisResult parseResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            StringBuilder textBuilder = new StringBuilder();
            JsonNode content = root.path("content");
            if (content.isArray()) {
                for (JsonNode block : content) {
                    if ("text".equals(block.path("type").asText())) {
                        textBuilder.append(block.path("text").asText());
                    }
                }
            }
            return AiAnalysisParser.parse(objectMapper, textBuilder.toString());
        } catch (Exception ex) {
            log.warn("Claude response parsing failed: {}", ex.getMessage());
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "CLAUDE_PARSE_FAILED",
                    "Claude 응답 파싱 실패");
        }
    }

    @Override
    public String complete(String systemPrompt, String userPrompt, int maxTokens) {
        if (!isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "CLAUDE_NOT_CONFIGURED",
                    "Anthropic API key가 설정되지 않았습니다");
        }
        Map<String, Object> body = Map.of(
                "model", props.model(),
                "max_tokens", maxTokens,
                "system", List.of(Map.of(
                        "type", "text",
                        "text", systemPrompt,
                        "cache_control", Map.of("type", "ephemeral"))),
                "messages", List.of(Map.of(
                        "role", "user",
                        "content", List.of(Map.of("type", "text", "text", userPrompt))))
        );
        String raw;
        try {
            raw = AiRetry.withRetry("Claude", () -> http.post()
                    .uri("/v1/messages")
                    .header("x-api-key", props.apiKey())
                    .body(body)
                    .retrieve()
                    .body(String.class));
        } catch (Exception ex) {
            log.error("Claude completion failed", ex);
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "CLAUDE_CALL_FAILED",
                    "Claude 호출 실패: " + ex.getMessage());
        }
        try {
            JsonNode root = objectMapper.readTree(raw);
            StringBuilder sb = new StringBuilder();
            for (JsonNode block : root.path("content")) {
                if ("text".equals(block.path("type").asText())) {
                    sb.append(block.path("text").asText());
                }
            }
            return sb.toString();
        } catch (Exception ex) {
            log.warn("Claude completion parse failed: {}", ex.getMessage());
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "CLAUDE_PARSE_FAILED", "Claude 응답 파싱 실패");
        }
    }

    @Override
    public String model() {
        return props.model();
    }
}
