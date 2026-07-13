package com.tubeshadow.practice.application;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tubeshadow.analysis.infrastructure.AiAnalysisClient;
import com.tubeshadow.common.exception.BusinessException;
import com.tubeshadow.practice.api.dto.ComposeFeedback;
import com.tubeshadow.practice.api.dto.InterviewCheckResponse;
import com.tubeshadow.practice.api.dto.MixResponse;
import com.tubeshadow.practice.api.dto.MockNextResponse;
import com.tubeshadow.practice.api.dto.ScenarioFeedback;
import com.tubeshadow.practice.api.dto.SparringReportRequest;
import com.tubeshadow.practice.api.dto.SparringReportResponse;
import com.tubeshadow.practice.api.dto.StoryResponse;
import com.tubeshadow.practice.prompt.ComposePrompt;
import com.tubeshadow.practice.prompt.MixPrompt;
import com.tubeshadow.practice.prompt.StoryPrompt;
import com.tubeshadow.practice.prompt.InterviewPrompt;
import com.tubeshadow.practice.prompt.PrecisionPrompt;
import com.tubeshadow.practice.prompt.MockInterviewPrompt;
import com.tubeshadow.practice.prompt.ScenarioPrompt;
import com.tubeshadow.practice.prompt.SparringReportPrompt;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * "영작" check: send the learner's sentence + target to the configured AI provider and parse the
 * verdict. Reuses the analysis provider abstraction's low-level {@code complete()} — no DB, no
 * persistence; one synchronous call. If no provider key is configured the endpoint reports 503.
 */
@Service
public class CompositionService {

    private final AiAnalysisClient ai;
    private final ObjectMapper objectMapper;

    public CompositionService(AiAnalysisClient ai, ObjectMapper objectMapper) {
        this.ai = ai;
        this.objectMapper = objectMapper;
    }

    public ComposeFeedback check(String target, String gloss, String sentence) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(ComposePrompt.SYSTEM, ComposePrompt.userMessage(target, gloss, sentence));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            return new ComposeFeedback(
                    n.path("ok").asBoolean(false),
                    n.path("usesTarget").asBoolean(false),
                    n.path("feedback").asText(""),
                    n.path("better").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "COMPOSE_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /**
     * Lenient grade of a spoken interview answer (explain a concept/code). Passes when the core idea
     * is understandable — imperfect or short English still counts; only a real error fails.
     */
    public InterviewCheckResponse interviewCheck(String question, String answer) {
        return interviewCheck(question, answer, false);
    }

    /** precision=true also surfaces preposition/article slips (opt-in; pass bar stays lenient). */
    public InterviewCheckResponse interviewCheck(String question, String answer, boolean precision) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String system = precision ? PrecisionPrompt.SYSTEM : InterviewPrompt.SYSTEM;
        String raw = ai.complete(system, InterviewPrompt.userMessage(question, answer));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            return new InterviewCheckResponse(
                    n.path("ok").asBoolean(false),
                    n.path("score").asInt(0),
                    n.path("feedback").asText(""),
                    n.path("better").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "INTERVIEW_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /**
     * Lenient grade of a scenario answer — the learner responded to a real-world situation in English.
     * Passes when the answer works in context; a different-but-valid answer is NOT penalized for not
     * matching the sample. Fills the output-practice gap (the drill used to show only the sample).
     */
    public ScenarioFeedback scenarioCheck(String situation, String koreanHint, String sample, String answer) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(ScenarioPrompt.SYSTEM,
                ScenarioPrompt.userMessage(situation, koreanHint, sample, answer));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            return new ScenarioFeedback(
                    n.path("ok").asBoolean(false),
                    n.path("fits").asBoolean(false),
                    n.path("feedback").asText(""),
                    n.path("better").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "SCENARIO_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /**
     * Next interviewer question in the mock-interview loop — an opener on an empty history,
     * otherwise a follow-up digging into the candidate's last answer. One short question per call.
     */
    public MockNextResponse mockNext(
            List<MockInterviewPrompt.Turn> history, long seed, String jobDescription) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(
                MockInterviewPrompt.SYSTEM,
                MockInterviewPrompt.userMessage(history, seed, jobDescription));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            String q = n.path("question").asText("");
            if (q.isBlank()) throw new IllegalStateException("empty question");
            return new MockNextResponse(q);
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "MOCK_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /**
     * Analyze the learner-only transcript posted after a realtime session. This is intentionally
     * read-only: client-owned card keys are echoed for the app to grade through the existing SRS API.
     */
    public SparringReportResponse sparringReport(
            List<String> userTurns, List<SparringReportRequest.Target> targets) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }

        Map<String, List<SparringReportRequest.Target>> targetsById = new LinkedHashMap<>();
        Map<String, String> idByNormalizedLabel = new LinkedHashMap<>();
        Set<String> cardKeys = new LinkedHashSet<>();
        List<SparringReportPrompt.Target> promptTargets = new ArrayList<>();
        for (SparringReportRequest.Target target : targets) {
            if (!cardKeys.add(target.cardKey())) {
                throw new BusinessException(HttpStatus.BAD_REQUEST, "SPARRING_REPORT_TARGETS_INVALID",
                        "스파링 리포트 타깃 키가 중복되었습니다.");
            }
            String normalizedLabel = normalizeTargetLabel(target.label());
            String id = idByNormalizedLabel.get(normalizedLabel);
            if (id == null) {
                id = "t" + (targetsById.size() + 1);
                idByNormalizedLabel.put(normalizedLabel, id);
                targetsById.put(id, new ArrayList<>());
                promptTargets.add(new SparringReportPrompt.Target(id, target.label(), target.ko()));
            }
            targetsById.get(id).add(target);
        }

        String raw = ai.complete(
                SparringReportPrompt.SYSTEM,
                SparringReportPrompt.userMessage(userTurns, promptTargets),
                800);
        try {
            JsonNode root = objectMapper.readTree(stripFence(raw));
            List<String> usedIds = requiredStringArray(root, "usedTargets");
            List<String> missedIds = requiredStringArray(root, "missedTargets");
            validateTargetPartition(targetsById.keySet(), usedIds, missedIds);

            List<SparringReportResponse.Correction> corrections = requiredCorrections(root);
            List<String> recurringMistakes = requiredStringArray(root, "recurringMistakes");
            Set<String> used = Set.copyOf(usedIds);
            Set<String> missed = Set.copyOf(missedIds);

            List<SparringReportResponse.Target> usedTargets = targetsById.entrySet().stream()
                    .filter(entry -> used.contains(entry.getKey()))
                    .flatMap(entry -> entry.getValue().stream())
                    .map(CompositionService::responseTarget)
                    .toList();
            List<SparringReportResponse.Target> missedTargets = targetsById.entrySet().stream()
                    .filter(entry -> missed.contains(entry.getKey()))
                    .flatMap(entry -> entry.getValue().stream())
                    .map(CompositionService::responseTarget)
                    .toList();
            return new SparringReportResponse(usedTargets, missedTargets, corrections, recurringMistakes);
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "SPARRING_REPORT_PARSE_FAILED",
                    "스파링 리포트 응답 파싱 실패");
        }
    }

    /**
     * Cross-pack "조합": combine 2-4 chunks (a frame, a phrasal, a term…) into ONE natural sentence.
     * The model reports {@code usedAll=false} + a note when the blocks can't honestly fit together,
     * so the result stays coherent ("말이 되게") rather than a forced mash.
     */
    public MixResponse mix(List<String> chunks) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        String raw = ai.complete(MixPrompt.SYSTEM, MixPrompt.userMessage(chunks));
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            String sentence = n.path("sentence").asText("");
            if (sentence.isBlank()) throw new IllegalStateException("empty sentence");
            return new MixResponse(
                    sentence,
                    n.path("gloss").asText(""),
                    n.path("usedAll").asBoolean(false),
                    n.path("note").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "MIX_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    /**
     * Daily "스토리 합성": weave 3-20 chunks the learner studied today into ONE short coherent passage
     * (3-6 sentences) they can read/shadow/memorize, so the day's items reinforce each other.
     */
    public StoryResponse story(List<String> chunks) {
        if (!ai.isConfigured()) {
            throw new BusinessException(HttpStatus.SERVICE_UNAVAILABLE, "AI_NOT_CONFIGURED",
                    "AI가 설정되지 않았습니다 (API 키 필요)");
        }
        // A paragraph needs a bigger output budget than a one-line verdict.
        String raw = ai.complete(StoryPrompt.SYSTEM, StoryPrompt.userMessage(chunks), 800);
        try {
            JsonNode n = objectMapper.readTree(stripFence(raw));
            String story = n.path("story").asText("");
            if (story.isBlank()) throw new IllegalStateException("empty story");
            return new StoryResponse(story, n.path("gloss").asText(""), n.path("note").asText(""));
        } catch (Exception ex) {
            throw new BusinessException(HttpStatus.BAD_GATEWAY, "STORY_PARSE_FAILED",
                    "AI 응답 파싱 실패");
        }
    }

    private static SparringReportResponse.Target responseTarget(SparringReportRequest.Target target) {
        return new SparringReportResponse.Target(target.cardKey(), target.label(), target.ko());
    }

    private static String normalizeTargetLabel(String label) {
        return label.strip().toLowerCase(Locale.ROOT).replaceAll("\\s+", " ");
    }

    private static List<String> requiredStringArray(JsonNode root, String field) {
        JsonNode array = root.get(field);
        if (array == null || !array.isArray()) {
            throw new IllegalArgumentException("missing array: " + field);
        }
        List<String> values = new ArrayList<>();
        Set<String> unique = new LinkedHashSet<>();
        for (JsonNode value : array) {
            if (!value.isTextual() || value.asText().isBlank() || !unique.add(value.asText())) {
                throw new IllegalArgumentException("invalid value in: " + field);
            }
            values.add(value.asText());
        }
        return List.copyOf(values);
    }

    private static List<SparringReportResponse.Correction> requiredCorrections(JsonNode root) {
        JsonNode array = root.get("corrections");
        if (array == null || !array.isArray()) {
            throw new IllegalArgumentException("missing corrections array");
        }
        List<SparringReportResponse.Correction> corrections = new ArrayList<>();
        for (JsonNode value : array) {
            String original = value.path("original").asText("");
            String corrected = value.path("corrected").asText("");
            if (!value.isObject() || original.isBlank() || corrected.isBlank()) {
                throw new IllegalArgumentException("invalid correction");
            }
            corrections.add(new SparringReportResponse.Correction(
                    original, corrected, value.path("explanation").asText("")));
        }
        return List.copyOf(corrections);
    }

    private static void validateTargetPartition(
            Set<String> expectedIds, List<String> usedIds, List<String> missedIds) {
        Set<String> classified = new LinkedHashSet<>(usedIds);
        for (String missedId : missedIds) {
            if (!classified.add(missedId)) {
                throw new IllegalArgumentException("target classified twice: " + missedId);
            }
        }
        if (!classified.equals(expectedIds)) {
            throw new IllegalArgumentException("target partition does not match request");
        }
    }

    /**
     * Tolerate a ```json … ``` markdown fence around the JSON, which some models add — whether the
     * payload is multi-line (```json\n{…}\n```) or all on one line (```json {…}```). Strips the
     * opening fence + optional language tag regardless of a trailing newline, then the closing fence.
     */
    static String stripFence(String s) {
        String t = s == null ? "" : s.trim();
        if (t.startsWith("```")) {
            t = t.replaceFirst("^```[a-zA-Z]*\\s*", "");
            if (t.endsWith("```")) t = t.substring(0, t.length() - 3);
        }
        return t.trim();
    }
}
