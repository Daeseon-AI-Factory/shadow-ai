package com.tubeshadow.billing;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Full-stack pins for the PAY-1 acceptance matrix (docs/MONETIZATION-DESIGN.md §14) that the
 * unit-level gate tests cannot prove: the real HTTP 403 SHADOW_REQUIRED envelope, the legacy plan
 * mapping for a Shadow-only subscriber, read access surviving a downgrade, and the V21 backfill.
 */
@Transactional
class EntitlementLifecycleTest extends SpringIntegrationTest {

    private static final String PASSWORD = "passpass1";

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired JdbcTemplate jdbc;
    @jakarta.persistence.PersistenceContext jakarta.persistence.EntityManager em;

    @Test
    void freeUserGetsA403ShadowRequiredThroughTheRealStack() throws Exception {
        String token = signupAndLogin("lifecycle-free@example.com"); // deliberately NO grant
        UUID videoId = seedVideo();

        mockMvc.perform(post("/api/clips")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clipBody(videoId)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error.code").value("SHADOW_REQUIRED"));
    }

    @Test
    void shadowOnlySubscriberReadsLegacyFreeButShadowActiveAndCanCreate() throws Exception {
        String token = signupAndLogin("lifecycle-shadow@example.com");
        UUID userId = currentUserId(token);
        jdbc.update("INSERT INTO user_entitlements (user_id, capability, source, environment, status, "
                        + "expires_at, last_verified_at, created_at) "
                        + "VALUES (?, 'SHADOW_ACCESS', 'REVENUECAT', 'PRODUCTION', 'ACTIVE', "
                        + "TIMESTAMP '2999-01-01 00:00:00', now(), now())", userId);

        // §6.3 step 3: legacy plan stays 'free' for Shadow-only — 'pro' would imply AI on old clients.
        mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.data.plan").value("free"))
                .andExpect(jsonPath("$.data.entitlements.shadow.active").value(true))
                .andExpect(jsonPath("$.data.entitlements.ai.active").value(false));

        mockMvc.perform(post("/api/clips")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clipBody(seedVideo())))
                .andExpect(status().isCreated());
    }

    @Test
    void downgradedUserKeepsReadingAndDeletingButCannotCreateNewPaidWork() throws Exception {
        String email = "lifecycle-downgrade@example.com";
        String token = signupAndLogin(email);
        grantPaidCapabilities(email);
        UUID userId = currentUserId(token);
        UUID videoId = seedVideo();

        String createResp = mockMvc.perform(post("/api/clips")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clipBody(videoId)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        UUID clipId = UUID.fromString(objectMapper.readTree(createResp).path("data").path("id").asText());

        // Expiry/downgrade: every entitlement row goes inactive. The JDBC update bypasses the
        // test-transaction persistence context, whose first-level cache still holds the rows the
        // first create loaded as ACTIVE — clear it so the next gate read sees the DB (production
        // requests each get a fresh persistence context, so this staleness is test-only).
        jdbc.update("UPDATE user_entitlements SET status = 'INACTIVE' WHERE user_id = ?", userId);
        em.flush();
        em.clear();

        // §3.2: previously created assets stay readable and deletable...
        mockMvc.perform(get("/api/clips").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/clips/" + clipId).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        // ...but new paid work fails closed.
        mockMvc.perform(post("/api/clips")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(clipBody(videoId)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error.code").value("SHADOW_REQUIRED"));

        mockMvc.perform(delete("/api/clips/" + clipId).header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
    }

    @Test
    void v21BackfillGrantsBothCapabilitiesToNonFreeUsersOnly() throws Exception {
        UUID proUser = UUID.randomUUID();
        UUID freeUser = UUID.randomUUID();
        jdbc.update("INSERT INTO users (id, email, password_hash, display_name, plan, plan_valid_until, created_at) "
                + "VALUES (?, 'backfill-pro@example.com', 'x', 'B', 'pro', TIMESTAMP '2999-01-01 00:00:00', now())", proUser);
        jdbc.update("INSERT INTO users (id, email, password_hash, display_name, plan, created_at) "
                + "VALUES (?, 'backfill-free@example.com', 'x', 'B', 'free', now())", freeUser);

        // Execute the migration's OWN backfill statement against the live schema — if V21's SQL
        // regresses (wrong WHERE, one capability, wrong expiry column), this fails.
        String sql = new String(getClass().getResourceAsStream(
                "/db/migration/V21__create_user_entitlements.sql").readAllBytes(), StandardCharsets.UTF_8);
        String backfill = sql.substring(sql.indexOf("INSERT INTO user_entitlements"));
        jdbc.execute(backfill);

        List<Map<String, Object>> proRows = jdbc.queryForList(
                "SELECT capability, source, environment, status, expires_at FROM user_entitlements "
                        + "WHERE user_id = ? ORDER BY capability", proUser);
        assertThat(proRows).hasSize(2);
        assertThat(proRows).extracting(r -> r.get("capability"))
                .containsExactly("AI_ACCESS", "SHADOW_ACCESS");
        assertThat(proRows).allSatisfy(r -> {
            assertThat(r.get("source")).isEqualTo("MIGRATION");
            assertThat(r.get("environment")).isEqualTo("PRODUCTION");
            assertThat(r.get("status")).isEqualTo("ACTIVE");
            assertThat(String.valueOf(r.get("expires_at"))).startsWith("2999-01-01");
        });

        Integer freeRows = jdbc.queryForObject(
                "SELECT count(*) FROM user_entitlements WHERE user_id = ?", Integer.class, freeUser);
        assertThat(freeRows).isZero();
    }

    private String clipBody(UUID videoId) throws Exception {
        return objectMapper.writeValueAsString(Map.of(
                "videoId", videoId.toString(), "startMs", 0, "endMs", 3000,
                "name", "lifecycle clip", "tags", List.of()));
    }

    private UUID seedVideo() {
        UUID videoId = UUID.randomUUID();
        jdbc.update("INSERT INTO videos (id, youtube_id, title, transcript_status, transcript_segments, created_at) "
                + "VALUES (?, ?, 'T', 'READY', '[]'::jsonb, now())",
                videoId, videoId.toString().substring(0, 11));
        return videoId;
    }

    private UUID currentUserId(String token) throws Exception {
        String me = mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
                .andReturn().getResponse().getContentAsString();
        return UUID.fromString(objectMapper.readTree(me).path("data").path("id").asText());
    }

    private String signupAndLogin(String email) throws Exception {
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "email", email, "password", PASSWORD, "displayName", "Lifecycle"))))
                .andExpect(status().isCreated());
        String resp = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("email", email, "password", PASSWORD))))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }
}
