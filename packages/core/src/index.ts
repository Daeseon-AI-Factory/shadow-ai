// @shadow-ai/core — platform-agnostic brain shared by the web and mobile clients.
// No DOM / Next / React Native imports live here; only data, logic, and the typed API layer.

// Drill content + practice logic
export * from "./patterns";
export * from "./collocations";
export * from "./phrasal-verbs";
export * from "./particles";
export * from "./english-patterns";
export * from "./phrasal-500";
export * from "./it-patterns";
export * from "./it-terms";
export * from "./ai-coding";
export * from "./prepositions-primer";
export * from "./practice-srs";
export * from "./sparring-detect";
export * from "./practice-cards";
export * from "./interview-drill";
export * from "./interview-terms";
export * from "./interview-phrases";

// Typed API layer (client is platform-agnostic: inject the token via setTokenProvider)
export * from "./api/client";
export * from "./api/auth";
export * from "./api/clips";
export * from "./api/library";
export * from "./api/analysis";
export * from "./api/videos";
export * from "./api/decks";
export * from "./api/collections";
export * from "./api/review";
export * from "./api/prepositions";
export * from "./api/practice";
export * from "./api/transforms";
export * from "./api/recordings";
export * from "./api/health";

// On-device YouTube transcript fetch (used by the mobile client to bypass the datacenter-IP block)
export * from "./youtube/transcript";
