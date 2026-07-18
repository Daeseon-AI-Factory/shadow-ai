import { getTranslations } from "next-intl/server";
import { LegalShell } from "@/components/legal/LegalShell";

const LAST_UPDATED = "July 16, 2026";

export async function generateMetadata() {
  const t = await getTranslations("legal");
  return { title: `${t("privacy")} — Mimi` };
}

export default async function PrivacyPage() {
  const t = await getTranslations("legal");

  return (
    <LegalShell title={t("privacy")} lastUpdated={LAST_UPDATED}>
      <p>
        This policy explains what Mimi collects, why, and your choices. Mimi is a personal
        English-learning tool and collects only what it needs to run.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li><strong>Account</strong> — your email, display name, and a securely hashed password.</li>
        <li><strong>Your content</strong> — the video clips, subtitle ranges, notes, and saved audio recordings you create.</li>
        <li><strong>Learning data</strong> — drill progress, review schedules, and streaks.</li>
        <li><strong>Access status</strong> — your server-assigned plan and its validity date. The current iOS app has no checkout and Mimi does not receive or store payment-card details.</li>
      </ul>

      <h2>2. How we use it</h2>
      <p>
        To provide the service: authenticate you, store your clips and progress, schedule reviews,
        and apply feature access. We do not sell your personal data or use it for third-party
        advertising or cross-app tracking.
      </p>

      <h2>3. Third parties</h2>
      <ul>
        <li><strong>YouTube</strong> — we fetch subtitles and metadata for the videos you choose.</li>
        <li><strong>AI text providers (Google Gemini, OpenAI, and Anthropic Claude)</strong> — text you submit to an AI feature may be sent to generate a translation, explanation, practice response, or feedback. Some results are cached to avoid unnecessary repeat requests.</li>
        <li><strong>Voice providers (OpenAI and Groq)</strong> — when you explicitly start live AI conversation or request speech-to-text feedback, your voice audio is sent for that request. Live conversation audio can flow directly between your device and OpenAI using a short-lived session credential.</li>
        <li><strong>Hosting</strong> — cloud infrastructure providers that run the service.</li>
      </ul>

      <h2>4. Microphone and photos</h2>
      <ul>
        <li><strong>Microphone</strong> — requested only after you tap a recording or talk control. A quick A/B shadowing take stays on your device; a take is uploaded only when you save it to your account or explicitly request transcription or AI voice practice.</li>
        <li><strong>Photos</strong> — Mimi does not open, upload, or store your photo library.</li>
      </ul>

      <h2>5. Storage and security</h2>
      <p>
        Passwords are hashed with bcrypt; sessions use signed tokens that can be revoked. Traffic is
        encrypted in transit. No system is perfectly secure, but we take reasonable measures to
        protect your data.
      </p>

      <h2>6. Your rights and deletion</h2>
      <p>
        You can delete your account from Settings at any time. Deletion removes your account, your
        recordings, and your learning data. You may also contact us to request access to or
        correction of your data.
      </p>

      <h2>7. Children</h2>
      <p>
        Mimi is not directed at children under 13 (or the minimum age in your jurisdiction) and we do
        not knowingly collect their data.
      </p>

      <h2>8. International transfer</h2>
      <p>
        Mimi is operated from and hosted in North America. By using it you understand your data may
        be processed in Canada and the United States.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update this policy; material changes are reflected by the &ldquo;Last updated&rdquo;
        date above.
      </p>

      <h2>10. Contact</h2>
      <p>
        Privacy questions: <a href="mailto:showep12@gmail.com">showep12@gmail.com</a>.
      </p>
    </LegalShell>
  );
}
