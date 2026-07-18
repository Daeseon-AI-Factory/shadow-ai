import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  return { title: "Support — Mimi" };
}

const SUPPORT_EMAIL = "showep12@gmail.com";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is Mimi?",
    a: "Mimi is an English shadowing app. You import a YouTube video, the app breaks the captions into lines and clips, and you practice by listening, repeating (shadowing), speaking, and reviewing — with word-by-word translation notes and spaced-repetition review.",
  },
  {
    q: "Does Mimi cost anything?",
    a: "Mimi’s core shadowing, drill, and spaced-repetition features are free. AI conversation and AI answer grading are available only to invited accounts during the current controlled rollout. The iOS app has no in-app purchase, subscription, pricing screen, upgrade button, or external purchase link.",
  },
  {
    q: "How do I import a video?",
    a: "Open the Shadowing tab, tap “+ Import a video,” and paste a YouTube link. Mimi fetches the captions and prepares the clips for you.",
  },
  {
    q: "How do I delete my account?",
    a: "Open the Me / Settings tab, scroll to “Delete account,” enter your password, and confirm. This permanently removes your account, recordings, and learning data.",
  },
  {
    q: "I found a bug or have a question.",
    a: (
      <>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we’ll get back to you. Please
        include your account email and a short description of what happened.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-1">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← Back to home
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Mimi Support</h1>
        <p className="text-sm text-muted-foreground">
          Help, answers, and how to get in touch.
        </p>
      </header>

      <section className="rounded-lg border bg-card p-4 text-sm">
        <h2 className="mb-1 text-base font-semibold">Contact us</h2>
        <p className="text-foreground/90">
          Questions, bug reports, or feedback? Email{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          . We typically reply within 1–2 business days.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold">Frequently asked questions</h2>
        <dl className="space-y-4 text-sm">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="space-y-1">
              <dt className="font-medium text-foreground">{q}</dt>
              <dd className="text-foreground/80 [&_a]:underline">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="mt-4 flex gap-4 border-t pt-4 text-sm text-muted-foreground">
        <Link href="/terms" className="hover:underline">Terms of Service</Link>
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        <Link href="/support" className="hover:underline">Support</Link>
      </footer>
    </main>
  );
}
