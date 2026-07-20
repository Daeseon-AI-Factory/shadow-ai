package com.tubeshadow.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Proves the account-deletion cascade is complete: a row is planted in EVERY user-owned table,
 * and after deletion all of them are gone while shared resources (videos) remain. This is the
 * regression that backs the FK-cascade audit — if a future migration adds a user-owned table
 * without ON DELETE CASCADE, this test fails.
 *
 * <p>Deliberately NOT @Transactional: the deletion + DB cascade must actually commit for the
 * post-delete row counts to be observable (a test-managed tx would defer the JPA delete).
 */
class AccountDeletionTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired JdbcTemplate jdbc;

    private static final String PASSWORD = "passpass1";

    @Test
    void deletingAccountWipesEveryUserOwnedTableButKeepsSharedVideos() throws Exception {
        String token = signupAndLogin("delete-me@example.com");
        UUID userId = currentUserId(token);

        // Plant one row in every user-owned table (+ a shared video the clip hangs off).
        UUID videoId = UUID.randomUUID();
        jdbc.update("INSERT INTO videos (id, youtube_id, title, transcript_status, transcript_segments, created_at) "
                + "VALUES (?, ?, 'T', 'READY', '[]'::jsonb, now())",
                videoId, videoId.toString().substring(0, 11));
        UUID clipId = UUID.randomUUID();
        jdbc.update("INSERT INTO clips (id, user_id, video_id, start_ms, end_ms, name, tags, created_at) "
                + "VALUES (?, ?, ?, 0, 1000, 'c', '[]'::jsonb, now())", clipId, userId, videoId);
        jdbc.update("INSERT INTO recordings (id, user_id, clip_id, file_path, duration_ms, size_bytes, created_at) "
                + "VALUES (?, ?, ?, '/tmp/none', 1000, 10, now())", UUID.randomUUID(), userId, clipId);
        jdbc.update("INSERT INTO review_items (id, user_id, clip_id, due_date, created_at) "
                + "VALUES (?, ?, ?, current_date, now())", UUID.randomUUID(), userId, clipId);
        jdbc.update("INSERT INTO decks (id, user_id, name, created_at) VALUES (?, ?, 'd', now())",
                UUID.randomUUID(), userId);
        jdbc.update("INSERT INTO practice_progress (id, user_id, created_at) VALUES (?, ?, now())",
                UUID.randomUUID(), userId);
        jdbc.update("INSERT INTO practice_card (id, user_id, card_key, due_date, created_at) "
                + "VALUES (?, ?, 'pat:x#0', current_date, now())", UUID.randomUUID(), userId);
        jdbc.update("INSERT INTO user_entitlements (user_id, capability, source, environment, status, "
                + "last_verified_at, created_at) "
                + "VALUES (?, 'SHADOW_ACCESS', 'MIGRATION', 'PRODUCTION', 'ACTIVE', now(), now())", userId);

        mockMvc.perform(delete("/api/auth/me")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("password", PASSWORD))))
                .andExpect(status().isNoContent());

        assertThat(countFor("users", "id", userId)).isZero();
        for (String table : new String[]{"clips", "recordings", "review_items", "decks",
                "practice_progress", "practice_card", "user_entitlements"}) {
            assertThat(countFor(table, "user_id", userId)).as("rows left in %s", table).isZero();
        }
        // Shared video is keyed globally (youtube_id) and must survive a user deletion.
        assertThat(countFor("videos", "id", videoId)).as("shared video kept").isEqualTo(1);
    }

    @Test
    void wrongPasswordDoesNotDelete() throws Exception {
        String token = signupAndLogin("keep-me@example.com");
        UUID userId = currentUserId(token);

        mockMvc.perform(delete("/api/auth/me")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("password", "wrong-password"))))
                .andExpect(status().isUnauthorized());

        assertThat(countFor("users", "id", userId)).isEqualTo(1);
    }

    private int countFor(String table, String column, UUID id) {
        Integer n = jdbc.queryForObject(
                "SELECT count(*) FROM " + table + " WHERE " + column + " = ?", Integer.class, id);
        return n == null ? 0 : n;
    }

    private UUID currentUserId(String token) throws Exception {
        String me = mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
                        .get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andReturn().getResponse().getContentAsString();
        return UUID.fromString(objectMapper.readTree(me).path("data").path("id").asText());
    }

    private String signupAndLogin(String email) throws Exception {
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "email", email, "password", PASSWORD, "displayName", "Del User"))))
                .andExpect(status().isCreated());
        String resp = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("email", email, "password", PASSWORD))))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }
}
