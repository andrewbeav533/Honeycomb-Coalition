"use client";
import { useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ActivityCard from "@/components/ActivityCard";
import { EVENTS, CLUBS, type Activity } from "@/app/activities";

const TABS = ["Events", "Clubs"] as const;

// Public page: only activities explicitly opened to non-hive visitors.
// Hive-private events (e.g. Fall Formal) never appear here.
const OPEN_EVENTS = EVENTS.filter((a) => a.open);
const OPEN_CLUBS = CLUBS.filter((a) => a.open);

export default function Browse() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Events");
  const [joining, setJoining] = useState<Activity | null>(null);
  const list = tab === "Events" ? OPEN_EVENTS : OPEN_CLUBS;

  return (
    <main>
      {joining && <GuestRsvp activity={joining} onClose={() => setJoining(null)} />}
      <SiteNav />

      {/* ── Header ──────────────────────────────────────────── */}
      <section className="hex-field" style={{ padding: "40px 20px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <span className="eyebrow">Open to everyone</span>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginTop: 14, maxWidth: 640 }}>
            Find something to join — no hive required.
          </h1>
          <p style={{ color: "var(--ink-soft)", marginTop: 16, fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.6 }}>
            Public-school students and families outside a hive can still come to open
            events and community clubs. Browse below and request to join.
          </p>

          {/* tabs */}
          <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="app-tab"
                style={{
                  padding: "9px 20px",
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  border: "1.5px solid var(--line)",
                  cursor: "pointer",
                  color: t === tab ? "var(--black)" : "var(--ink-soft)",
                  background: t === tab ? "var(--honey)" : "transparent",
                  borderColor: t === tab ? "var(--honey)" : "var(--line)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mono" style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 14, display: "flex", alignItems: "center", gap: 7 }}>
            <span>🔒</span>
            {tab === "Events"
              ? "You're seeing only events a hive opened to the public — private hive events stay inside the hive."
              : "Clubs are public by nature — run by libraries, rec centers, and maker spaces."}
          </p>
        </div>
      </section>

      {/* ── Grid ────────────────────────────────────────────── */}
      <section className="orb-field" style={{ padding: "16px 20px 72px" }}>
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 20,
          }}
        >
          {list.map((a) => (
            <ActivityCard key={a.id} a={a} onJoin={setJoining} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
            Want to run your own hive?
          </p>
          <Link href="/login" className="btn btn-ink" style={{ marginTop: 14 }}>
            Create an account →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ── Guest RSVP (no account) ───────────────────────────────────── */
function GuestRsvp({ activity, onClose }: { activity: Activity; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(21,18,14,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-strong"
        style={{ borderRadius: 22, padding: 28, width: "100%", maxWidth: 420 }}
      >
        {sent ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🎉</div>
            <h2 style={{ fontSize: "1.5rem", marginTop: 10 }}>You&apos;re on the list</h2>
            <p style={{ color: "var(--ink-soft)", marginTop: 10, fontSize: 15, lineHeight: 1.6 }}>
              We&apos;ve sent the details for <strong>{activity.title}</strong> to your email.
              {activity.type === "event" ? " The host will confirm your spot." : " Just show up — no account needed."}
            </p>
            <button className="btn btn-honey" style={{ marginTop: 20, width: "100%" }} onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">{activity.type === "club" ? "Join club" : "Request to attend"}</span>
            <h2 style={{ fontSize: "1.5rem", marginTop: 8 }}>{activity.title}</h2>
            <p className="mono" style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4 }}>
              {activity.host} · {activity.when}
            </p>
            <p style={{ color: "var(--ink-soft)", marginTop: 14, fontSize: 14, lineHeight: 1.6 }}>
              No account needed — just tell us who to expect.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}
            >
              <input className="field" placeholder="Your name" required />
              <input className="field" type="email" placeholder="Email" required />
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-honey" style={{ flex: 1 }}>
                  {activity.type === "club" ? "Join" : "Request"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
