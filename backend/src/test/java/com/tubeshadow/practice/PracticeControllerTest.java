package com.tubeshadow.practice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class PracticeControllerTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    void progressStartsEmpty() throws Exception {
        String token = signupAndLogin("empty@example.com");

        mockMvc.perform(get("/api/practice/progress").param("localDate", "2026-01-10")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.reps").value(0))
                .andExpect(jsonPath("$.data.streak").value(0))
                .andExpect(jsonPath("$.data.totalReps").value(0));
    }

    @Test
    void repsAccumulateWithinTheSameDay() throws Exception {
        String token = signupAndLogin("same-day@example.com");

        rep(token, "2026-01-10")
                .andExpect(jsonPath("$.data.reps").value(1))
                .andExpect(jsonPath("$.data.streak").value(1))
                .andExpect(jsonPath("$.data.totalReps").value(1));

        rep(token, "2026-01-10")
                .andExpect(jsonPath("$.data.reps").value(2))
                .andExpect(jsonPath("$.data.streak").value(1))
                .andExpect(jsonPath("$.data.totalReps").value(2));

        // a later GET on the same day still shows today's reps
        mockMvc.perform(get("/api/practice/progress").param("localDate", "2026-01-10")
                        .header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.data.reps").value(2))
                .andExpect(jsonPath("$.data.streak").value(1));
    }

    @Test
    void consecutiveDaysExtendStreakAndResetTodayReps() throws Exception {
        String token = signupAndLogin("streak@example.com");

        rep(token, "2026-01-10");
        rep(token, "2026-01-11")
                .andExpect(jsonPath("$.data.reps").value(1))   // new day → reps reset
                .andExpect(jsonPath("$.data.streak").value(2))  // consecutive → streak grows
                .andExpect(jsonPath("$.data.totalReps").value(2));
    }

    @Test
    void aMissedDayResetsTheStreak() throws Exception {
        String token = signupAndLogin("gap@example.com");

        rep(token, "2026-01-10");
        rep(token, "2026-01-13") // skipped 11th & 12th
                .andExpect(jsonPath("$.data.streak").value(1))
                .andExpect(jsonPath("$.data.totalReps").value(2));
    }

    @Test
    void streakLapsesOnReadAfterAMissedDay() throws Exception {
        String token = signupAndLogin("lapse@example.com");

        rep(token, "2026-01-10").andExpect(jsonPath("$.data.streak").value(1));
        // reading two days later: the streak is no longer alive
        mockMvc.perform(get("/api/practice/progress").param("localDate", "2026-01-12")
                        .header("Authorization", "Bearer " + token))
                .andExpect(jsonPath("$.data.streak").value(0))
                .andExpect(jsonPath("$.data.reps").value(0))
                .andExpect(jsonPath("$.data.totalReps").value(1)); // total is preserved
    }

    @Test
    void progressIsIsolatedPerUser() throws Exception {
        String a = signupAndLogin("a@example.com");
        String b = signupAndLogin("b@example.com");

        rep(a, "2026-01-10");
        rep(a, "2026-01-10");

        mockMvc.perform(get("/api/practice/progress").param("localDate", "2026-01-10")
                        .header("Authorization", "Bearer " + b))
                .andExpect(jsonPath("$.data.reps").value(0))
                .andExpect(jsonPath("$.data.streak").value(0));
    }

    @Test
    void mockInterviewRejectsAnOversizedJobDescriptionBeforeTheAiGate() throws Exception {
        String token = signupAndLogin("mock-jd-too-long@example.com");
        String body = objectMapper.writeValueAsString(Map.of(
                "history", java.util.List.of(),
                "seed", 42,
                "jobDescription", "x".repeat(12001)));

        mockMvc.perform(post("/api/practice/interview/mock")
                        .contentType(MediaType.APPLICATION_JSON).content(body)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    @Test
    void mockInterviewRejectsANullHistoryTurnBeforeTheAiGate() throws Exception {
        String token = signupAndLogin("mock-null-turn@example.com");

        mockMvc.perform(post("/api/practice/interview/mock")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"history\":[null],\"seed\":42}")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    private org.springframework.test.web.servlet.ResultActions rep(String token, String localDate) throws Exception {
        String body = objectMapper.writeValueAsString(Map.of("localDate", localDate));
        return mockMvc.perform(post("/api/practice/rep")
                        .contentType(MediaType.APPLICATION_JSON).content(body)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    private String signupAndLogin(String email) throws Exception {
        String body = objectMapper.writeValueAsString(Map.of(
                "email", email, "password", "passpass1", "displayName", "Drill User"));
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());
        String loginBody = objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"));
        String resp = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(loginBody))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }
}
