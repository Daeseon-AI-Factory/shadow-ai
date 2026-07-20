package com.tubeshadow.practice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.SpringIntegrationTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
class PracticeSrsControllerTest extends SpringIntegrationTest {

    @Autowired MockMvc mockMvc;
    @Autowired ObjectMapper objectMapper;

    @Test
    void correctRecallPromotesBoxAndPushesDueOut() throws Exception {
        String token = signupAndLogin("srs-correct@example.com");

        grade(token, "pat:on-depend-on#0", true, "2026-01-10")
                .andExpect(jsonPath("$.data.card.box").value(1))
                .andExpect(jsonPath("$.data.card.dueDate").value("2026-01-11"))   // box 1 → +1 day
                .andExpect(jsonPath("$.data.card.correctCount").value(1))
                .andExpect(jsonPath("$.data.progress.streak").value(1))           // grading counts as a rep
                .andExpect(jsonPath("$.data.progress.reps").value(1));

        grade(token, "pat:on-depend-on#0", true, "2026-01-11")
                .andExpect(jsonPath("$.data.card.box").value(2))
                .andExpect(jsonPath("$.data.card.dueDate").value("2026-01-13"))   // box 2 → +2 days
                .andExpect(jsonPath("$.data.progress.streak").value(2));          // consecutive day
    }

    @Test
    void aMissResetsToBoxOneDueTomorrow() throws Exception {
        String token = signupAndLogin("srs-miss@example.com");

        grade(token, "col:for-responsible-for#0", true, "2026-01-10")
                .andExpect(jsonPath("$.data.card.box").value(1));

        grade(token, "col:for-responsible-for#0", false, "2026-01-11")
                .andExpect(jsonPath("$.data.card.box").value(1))                  // miss → back to box 1
                .andExpect(jsonPath("$.data.card.dueDate").value("2026-01-12"))   // due tomorrow
                .andExpect(jsonPath("$.data.card.lapseCount").value(1));
    }

    @Test
    void statesListGradedCardsAndAreIsolatedPerUser() throws Exception {
        String a = signupAndLogin("srs-a@example.com");
        String b = signupAndLogin("srs-b@example.com");

        grade(a, "pat:tense-used-to-three-way#1", true, "2026-01-10");
        grade(a, "col:to-deploy-to#0", false, "2026-01-10");

        mockMvc.perform(get("/api/practice/srs").header("Authorization", "Bearer " + a))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(2));

        // a different user sees none of A's cards
        mockMvc.perform(get("/api/practice/srs").header("Authorization", "Bearer " + b))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.length()").value(0));
    }

    @Test
    void gradeRequiresCardKeyAndCorrect() throws Exception {
        String token = signupAndLogin("srs-validation@example.com");
        String bad = objectMapper.writeValueAsString(Map.of("localDate", "2026-01-10")); // no cardKey/correct
        mockMvc.perform(post("/api/practice/srs/grade")
                        .contentType(MediaType.APPLICATION_JSON).content(bad)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest());
    }

    private ResultActions grade(String token, String cardKey, boolean correct, String localDate) throws Exception {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("cardKey", cardKey);
        body.put("correct", correct);
        body.put("localDate", localDate);
        return mockMvc.perform(post("/api/practice/srs/grade")
                        .contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(body))
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    private String signupAndLogin(String email) throws Exception {
        String body = objectMapper.writeValueAsString(Map.of(
                "email", email, "password", "passpass1", "displayName", "Srs User"));
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated());
        grantPaidCapabilities(email);
        String loginBody = objectMapper.writeValueAsString(Map.of("email", email, "password", "passpass1"));
        String resp = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON).content(loginBody))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(resp).path("data").path("accessToken").asText();
    }
}
