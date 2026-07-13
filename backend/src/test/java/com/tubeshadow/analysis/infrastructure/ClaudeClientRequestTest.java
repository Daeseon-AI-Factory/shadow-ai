package com.tubeshadow.analysis.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.Test;

import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.atomic.AtomicReference;

import static org.assertj.core.api.Assertions.assertThat;

class ClaudeClientRequestTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void completeMarksTheStableSystemBlockForEphemeralCaching() throws Exception {
        AtomicReference<String> receivedBody = new AtomicReference<>();
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/v1/messages", exchange -> {
            assertThat(exchange.getRequestHeaders().getFirst("anthropic-version"))
                    .isEqualTo("2023-06-01");
            assertThat(exchange.getRequestHeaders().getFirst("x-api-key")).isEqualTo("test-key");
            receivedBody.set(new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8));

            byte[] response = """
                    {"content":[{"type":"text","text":"completion text"}]}
                    """.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.length);
            exchange.getResponseBody().write(response);
            exchange.close();
        });
        server.start();

        try {
            ClaudeClient client = new ClaudeClient(
                    new ClaudeProperties(
                            "test-key",
                            "http://127.0.0.1:" + server.getAddress().getPort(),
                            "claude-test"),
                    objectMapper);

            assertThat(client.complete("stable system", "variable user", 321))
                    .isEqualTo("completion text");

            JsonNode request = objectMapper.readTree(receivedBody.get());
            assertThat(request.path("model").asText()).isEqualTo("claude-test");
            assertThat(request.path("max_tokens").asInt()).isEqualTo(321);
            assertThat(request.path("system").path(0).path("text").asText())
                    .isEqualTo("stable system");
            assertThat(request.path("system").path(0).path("cache_control").path("type").asText())
                    .isEqualTo("ephemeral");
            assertThat(request.path("messages").path(0).path("content").path(0).path("text").asText())
                    .isEqualTo("variable user");
        } finally {
            server.stop(0);
        }
    }
}
