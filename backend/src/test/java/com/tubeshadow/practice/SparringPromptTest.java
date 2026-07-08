package com.tubeshadow.practice;

import com.tubeshadow.practice.infrastructure.SparringClient;
import com.tubeshadow.practice.prompt.SparringPrompt;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class SparringPromptTest {

    @Test
    void chatModeUsesFriendPersonaAndAppendsTargetsLast() {
        String prompt = SparringPrompt.build("chat", List.of(
                new SparringPrompt.Target("figure out", "알아내다"),
                new SparringPrompt.Target("end up", null)));

        assertThat(prompt).startsWith(SparringPrompt.CHAT_PERSONA);
        // Cache-friendliness: the variable part (targets) must come AFTER the fixed persona.
        assertThat(prompt.indexOf("figure out")).isGreaterThan(SparringPrompt.CHAT_PERSONA.length() - 1);
        assertThat(prompt).contains("Korean gloss: 알아내다");
        // A target without a gloss still lists the label, without an empty gloss clause.
        assertThat(prompt).contains("- end up\n");
    }

    @Test
    void interviewModeUsesInterviewerPersona() {
        String prompt = SparringPrompt.build("interview", List.of());
        assertThat(prompt).isEqualTo(SparringPrompt.INTERVIEW_PERSONA);
        assertThat(prompt).contains("mock interview");
        assertThat(prompt).doesNotContain("Secret coaching goal");
    }

    @Test
    void unknownModeFallsBackToChat() {
        assertThat(SparringPrompt.build("whatever", null)).isEqualTo(SparringPrompt.CHAT_PERSONA);
    }

    @Test
    void turnDetectionIsPatientInInterviewAndFastInChat() {
        Map<String, Object> chat = SparringClient.turnDetection("chat");
        Map<String, Object> interview = SparringClient.turnDetection("interview");
        assertThat(chat.get("silence_duration_ms")).isEqualTo(250);
        assertThat(interview.get("silence_duration_ms")).isEqualTo(800);
        assertThat(chat.get("type")).isEqualTo("server_vad");
        assertThat((Boolean) interview.get("interrupt_response")).isTrue();
    }
}
