package com.tubeshadow.recording;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import com.tubeshadow.auth.domain.User;
import com.tubeshadow.auth.repository.UserRepository;
import com.tubeshadow.clip.api.dto.ClipCreateRequest;
import com.tubeshadow.video.domain.TranscriptSegment;
import com.tubeshadow.video.domain.Video;
import com.tubeshadow.video.repository.VideoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class RecordingControllerTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired UserRepository userRepository;
    @Autowired VideoRepository videoRepository;

    @Test
    void uploadListStreamDelete() throws Exception {
        User u = signupAndLogin();
        String token = login(u.getEmail(), "passpass1");

        Video video = videoRepository.save(seededVideo());
        UUID clipId = createClip(token, video.getId());

        // Upload
        byte[] audio = new byte[]{1, 2, 3, 4, 5, 6, 7, 8};
        MockMultipartFile filePart = new MockMultipartFile("file", "rec.webm", "audio/webm", audio);
        String uploadResp = mockMvc.perform(multipart("/api/clips/" + clipId + "/recordings")
                        .file(filePart)
                        .param("durationMs", "2000")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        UUID recordingId = UUID.fromString(objectMapper.readTree(uploadResp).path("data").path("id").asText());

        // List
        mockMvc.perform(get("/api/clips/" + clipId + "/recordings")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(1));

        // Stream
        mockMvc.perform(get("/api/recordings/" + recordingId + "/audio")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        // Stream as other user → 403
        User u2 = signupAndLogin2();
        String token2 = login(u2.getEmail(), "passpass2");
        mockMvc.perform(get("/api/recordings/" + recordingId + "/audio")
                        .header("Authorization", "Bearer " + token2))
                .andExpect(status().isForbidden());

        // Delete
        mockMvc.perform(delete("/api/recordings/" + recordingId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
    }

    @Test
    void acceptsContentTypeWithCodecParameter() throws Exception {
        // Chrome's MediaRecorder tags audio as "audio/webm;codecs=opus" — the controller
        // must strip the codec parameter before checking the whitelist.
        User u = signupAndLogin();
        String token = login(u.getEmail(), "passpass1");
        Video video = videoRepository.save(seededVideo());
        UUID clipId = createClip(token, video.getId());

        byte[] audio = new byte[]{1, 2, 3, 4};
        MockMultipartFile filePart = new MockMultipartFile(
                "file", "rec.webm", "audio/webm;codecs=opus", audio);
        mockMvc.perform(multipart("/api/clips/" + clipId + "/recordings")
                        .file(filePart)
                        .param("durationMs", "1500")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isCreated());
    }

    @Test
    void rejectsUnsupportedFormat() throws Exception {
        User u = signupAndLogin();
        String token = login(u.getEmail(), "passpass1");
        Video video = videoRepository.save(seededVideo());
        UUID clipId = createClip(token, video.getId());

        MockMultipartFile filePart = new MockMultipartFile("file", "rec.txt", "text/plain", new byte[]{1, 2});
        mockMvc.perform(multipart("/api/clips/" + clipId + "/recordings")
                        .file(filePart)
                        .param("durationMs", "1000")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnsupportedMediaType());
    }

    // helpers
    private User signupAndLogin() throws Exception {
        String body = objectMapper.writeValueAsString(java.util.Map.of(
                "email", "rec@example.com", "password", "passpass1", "displayName", "Rec"));
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());
        grantPaidCapabilities("rec@example.com");
        return userRepository.findByEmail("rec@example.com").orElseThrow();
    }

    private User signupAndLogin2() throws Exception {
        String body = objectMapper.writeValueAsString(java.util.Map.of(
                "email", "rec2@example.com", "password", "passpass2", "displayName", "Rec2"));
        mockMvc.perform(post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());
        grantPaidCapabilities("rec2@example.com");
        return userRepository.findByEmail("rec2@example.com").orElseThrow();
    }

    private String login(String email, String pw) throws Exception {
        String body = objectMapper.writeValueAsString(java.util.Map.of("email", email, "password", pw));
        String resp = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }

    private UUID createClip(String token, UUID videoId) throws Exception {
        String body = objectMapper.writeValueAsString(
                new ClipCreateRequest(videoId, 0L, 3000L, "rec clip", List.of()));
        String resp = mockMvc.perform(post("/api/clips")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return UUID.fromString(objectMapper.readTree(resp).path("data").path("id").asText());
    }

    private Video seededVideo() {
        Video v = Video.createNew("recvideo001", "Rec test");
        v.applyMetadata("ch", 60, "t");
        v.attachTranscript(List.of(new TranscriptSegment(0, 3000, "Test")));
        return v;
    }
}
