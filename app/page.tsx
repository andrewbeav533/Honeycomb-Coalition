import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import HoneycombHero from "@/components/HoneycombHero";

const PERKS = [
  {
    icon: "🪪",
    title: "Invite-only by design",
    body: "Every family is verified and every adult's clearance is on record. No open sign-ups — the people in your hive are the people you'd recognize at the door.",
  },
  {
    icon: "📍",
    title: "Hives scoped to your area",
    body: "Join your local group with a code. You only see your hive's events, classes, and photos — no clutter from across the state.",
  },
  {
    icon: "📅",
    title: "Events without the group chat",
    body: "Proms, homecomings, field trips — announced in one place, with RSVPs and day-of check-in. Parents stop chasing payments and headcounts.",
  },
  {
    icon: "📚",
    title: "Classes and materials together",
    body: "Co-op leaders publish resources, assignments, and grades. Students open exactly what they're enrolled in — nothing they aren't.",
  },
  {
    icon: "📷",
    title: "Photos only attendees can see",
    body: "Event galleries open to the families who were actually there. Not a public link, not a password passed around — attendance is the key.",
  },
  {
    icon: "🤝",
    title: "Built to lighten the load",
    body: "The volunteers who run everything carry less: one tool for sign-ups, rosters, and coordination instead of six spreadsheets and a phone tree.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create your account",
    body: "Sign up as a student or a parent. Your account carries your name, your role, and your location — the basis for everything you can reach.",
  },
  {
    n: "02",
    title: "Join your hive with a code",
    body: "Your co-op shares a join code. Enter it once and you're placed in your local hive, with the events and classes that belong to it.",
  },
  {
    n: "03",
    title: "Your hive home",
    body: "Land on a home built for you: what's happening next, your classes, your to-do list, and the galleries from events you attended.",
  },
];

export default function Home() {
  return (
    <main>
      <SiteNav />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="orb-field hex-field" style={{ padding: "40px 20px 72px" }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 40,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <div className="animate-fade-up">
            <span className="eyebrow">For homeschool communities</span>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5.6vw, 4.2rem)",
                marginTop: 18,
                maxWidth: 560,
              }}
            >
              One hive for your whole homeschool community.
            </h1>
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
                color: "var(--ink-soft)",
                marginTop: 22,
                maxWidth: 480,
                lineHeight: 1.6,
              }}
            >
              HoneyComb brings events, classes, and photos into one safe, invite-only
              space — so parents organize less and families connect more.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
              <Link href="/login" className="btn btn-honey">Create your account →</Link>
              <a href="#how" className="btn btn-ghost">See how it works</a>
            </div>
            <p className="mono" style={{ marginTop: 22, fontSize: 12.5, color: "var(--ink-soft)" }}>
              Already have a code?{" "}
              <Link href="/login" style={{ color: "var(--honey-deep)", fontWeight: 700 }}>
                Join your hive
              </Link>
            </p>
          </div>

          <div className="animate-fade-up delay-100">
            <HoneycombHero />
          </div>
        </div>
      </section>

      {/* ── The shift ──────────────────────────────────────── */}
      <section style={{ background: "var(--black)", color: "#f4efe3", padding: "64px 20px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "var(--honey)" }}>Why HoneyComb</span>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginTop: 16 }}>
            Right now it runs on word-of-mouth, group texts, and a few parents&apos; personal
            spreadsheets.
          </h2>
          <p style={{ color: "#b8ad98", fontSize: "1.1rem", marginTop: 18, lineHeight: 1.6 }}>
            That works until it doesn&apos;t — until a family in the next town can&apos;t find you,
            a payment slips through, or no one can say who&apos;s allowed in the room. HoneyComb
            gives a growing community the structure it has outgrown, without losing what makes it feel
            like home.
          </p>
        </div>
      </section>

      {/* ── Perks ──────────────────────────────────────────── */}
      <section id="perks" className="hex-field" style={{ padding: "76px 20px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
            <span className="eyebrow">What a hive gives you</span>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 14 }}>
              Everything an event needs, in one place.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 20,
            }}
          >
            {PERKS.map((p) => (
              <div key={p.title} className="glass lift" style={{ borderRadius: 20, padding: 26 }}>
                <div
                  className="hex"
                  style={{
                    width: 46,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(160deg, var(--honey-bright), var(--honey))",
                    fontSize: 22,
                    marginBottom: 16,
                  }}
                >
                  {p.icon}
                </div>
                <h3 style={{ fontSize: "1.22rem" }}>{p.title}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 10, fontSize: 15, lineHeight: 1.6 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section id="how" className="orb-field" style={{ padding: "76px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 48px" }}>
            <span className="eyebrow">From sign-up to home in three steps</span>
            <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", marginTop: 14 }}>
              How you join a hive
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="glass-strong"
                style={{ borderRadius: 20, padding: 28, position: "relative" }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--honey-deep)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.n}
                </span>
                <h3 style={{ fontSize: "1.3rem", marginTop: 14 }}>{s.title}</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 10, fontSize: 15, lineHeight: 1.6 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link href="/login" className="btn btn-honey">Create your account →</Link>
          </div>
        </div>
      </section>

      {/* ── Safety ─────────────────────────────────────────── */}
      <section id="safe" className="hex-field" style={{ padding: "20px 20px 84px" }}>
        <div
          className="glass"
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            borderRadius: 28,
            padding: "clamp(32px, 5vw, 56px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 36,
            alignItems: "center",
          }}
        >
          <div style={{ gridColumn: "1 / -1", maxWidth: 560 }}>
            <span className="eyebrow">A safe environment, by default</span>
            <h2 style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", marginTop: 14 }}>
              The part families actually worry about.
            </h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 16, fontSize: 16, lineHeight: 1.65 }}>
              For a faith-based community working with minors, &ldquo;safe&rdquo; can&apos;t be a
              setting you flip later. HoneyComb builds it in: verified families, adults cleared before
              they&apos;re given contact with students, and photos that only reach the people who were
              in the room. It&apos;s the trust PASE already runs on — written into the software.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA band ───────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--honey-bright), var(--honey-deep))",
          padding: "68px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "var(--black)" }}>
            Ready to see your hive?
          </h2>
          <p style={{ color: "#4a3a05", marginTop: 14, fontSize: "1.1rem" }}>
            Create an account, enter your group code, and step inside the student home.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/login" className="btn btn-ink">Create your account →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
