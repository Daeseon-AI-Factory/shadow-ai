package com.tubeshadow.practice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class SparringReportControllerTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    void authenticatedButUnentitledUserIsStoppedByTheAiGate() throws Exception {
        String token = signupAndLogin("sparring-report-gated@example.com");

        mockMvc.perform(post("/api/practice/sparring/report")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validReportBody())
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.error.code").value("AI_NOT_ALLOWED"));
    }

    @Test
    void rejectsAnEmptyTranscriptBeforeCallingTheReportService() throws Exception {
        String token = signupAndLogin("sparring-report-empty@example.com");
        String body = objectMapper.writeValueAsString(Map.of(
                "userTurns", List.of(),
                "targets", List.of(Map.of(
                        "cardKey", "verb:figure-out",
                        "label", "figure out",
                        "ko", "알아내다"))));

        mockMvc.perform(post("/api/practice/sparring/report")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    @Test
    void requiresAuthentication() throws Exception {
        mockMvc.perform(post("/api/practice/sparring/report")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validReportBody()))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void rejectsANullTargetBeforeCallingTheReportService() throws Exception {
        String token = signupAndLogin("sparring-report-null-target@example.com");

        mockMvc.perform(post("/api/practice/sparring/report")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userTurns\":[\"hello\"],\"targets\":[null]}")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    private String validReportBody() throws Exception {
        return objectMapper.writeValueAsString(Map.of(
                "userTurns", List.of("I figured out why the build failed."),
                "targets", List.of(Map.of(
                        "cardKey", "verb:figure-out",
                        "label", "figure out",
                        "ko", "알아내다"))));
    }

    private String signupAndLogin(String email) throws Exception {
        String body = objectMapper.writeValueAsString(Map.of(
                "email", email, "password", "passpass1", "displayName", "Report User"));
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());
        String loginBody = objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"));
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(loginBody))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(response).path("data").path("accessToken").asText();
    }
}
