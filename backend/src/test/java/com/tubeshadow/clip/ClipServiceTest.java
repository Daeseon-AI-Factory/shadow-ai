package com.tubeshadow.clip;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.clip.api.dto.ClipCreateRequest;
import com.tubeshadow.clip.repository.ClipRepository;
import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.VideoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class ClipServiceTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired UserRepository userRepository;
    @Autowired VideoRepository videoRepository;
    @Autowired ClipRepository clipRepository;

    @Test
    void unauthenticatedReturns401() throws Exception {
        mockMvc.perform(get("/api/clips")).andExpect(status().isUnauthorized());
    }

    @Test
    void createListGetDeleteFlow() throws Exception {
        User u1 = signupAndLogin("a@example.com", "passpass1");
        User u2 = signupAndLogin("b@example.com", "passpass2");
        String tokenA = issueToken(u1);
        String tokenB = issueToken(u2);

        Video video = videoRepository.save(seededVideo());

        String createBody = objectMapper.writeValueAsString(new ClipCreateRequest(
                video.getId(), 0L, 3000L, "First clip", List.of("greeting")));

        // u1 creates a clip
        String createResp = mockMvc.perform(post("/api/clips")
                        .header("Authorization", "Bearer " + tokenA)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.transcript").value("Hello world How are you"))
                .andReturn().getResponse().getContentAsString();
        UUID clipId = UUID.fromString(objectMapper.readTree(createResp).path("data").path("id").asText());

        // u1 lists clips → sees own
        mockMvc.perform(get("/api/clips").header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items.length()").value(1))
                .andExpect(jsonPath("$.data.total").value(1));

        // u2 lists clips → sees none (data isolation)
        mockMvc.perform(get("/api/clips").header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items.length()").value(0));

        // u2 tries to delete u1's clip → 403
        mockMvc.perform(delete("/api/clips/" + clipId).header("Authorization", "Bearer " + tokenB))
                .andExpect(status().isForbidden());

        // u1 deletes → 204
        mockMvc.perform(delete("/api/clips/" + clipId).header("Authorization", "Bearer " + tokenA))
                .andExpect(status().isNoContent());

        assertThat(clipRepository.findById(clipId)).isEmpty();
    }

    @Test
    @WithMockUser
    void searchFiltersByQueryAndTag() throws Exception {
        User u = signupAndLogin("search@example.com", "passpass1");
        String token = issueToken(u);
        Video video = videoRepository.save(seededVideo());

        createClip(token, video.getId(), 0L, 1500L, "greeting clip", List.of("greeting", "easy"));
        createClip(token, video.getId(), 1500L, 3000L, "question clip", List.of("question"));

        mockMvc.perform(get("/api/clips").header("Authorization", "Bearer " + token).param("q", "question"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items.length()").value(1))
                .andExpect(jsonPath("$.data.items[0].name").value("question clip"));

        mockMvc.perform(get("/api/clips").header("Authorization", "Bearer " + token).param("tag", "greeting"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items.length()").value(1))
                .andExpect(jsonPath("$.data.items[0].name").value("greeting clip"));
    }

    private void createClip(String token, UUID videoId, long start, long end, String name, List<String> tags) throws Exception {
        String body = objectMapper.writeValueAsString(new ClipCreateRequest(videoId, start, end, name, tags));
        mockMvc.perform(post("/api/clips")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated());
    }

    private User signupAndLogin(String email, String password) throws Exception {
        String body = objectMapper.writeValueAsString(java.util.Map.of(
                "email", email, "password", password, "displayName", "T"));
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated());
        grantPaidCapabilities(email);
        return userRepository.findByEmail(email).orElseThrow();
    }

    private String issueToken(User user) throws Exception {
        String body = objectMapper.writeValueAsString(java.util.Map.of("email", user.getEmail(), "password", "passpass1".substring(0, "passpass1".length())));
        // The two users share password "passpass1"/"passpass2"; we re-login appropriately.
        String pw = user.getEmail().startsWith("b@") ? "passpass2" : "passpass1";
        body = objectMapper.writeValueAsString(java.util.Map.of("email", user.getEmail(), "password", pw));
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(response).path("data").path("accessToken").asText();
    }

    private Video seededVideo() {
        Video v = Video.createNew("seedvideo01", "Seed");
        v.applyMetadata("Seed Channel", 60, "https://t");
        v.attachTranscript(List.of(
                new TranscriptSegment(0, 1500, "Hello world"),
                new TranscriptSegment(1500, 3000, "How are you")));
        return v;
    }
}
