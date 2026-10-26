"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"create" | "signin">("create");
  const [step, setStep] = useState<"account" | "code">("account");

  function go(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "create" && step === "account") {
      setStep("code");
      return;
    }
    router.push("/student");
  }

  const creating = mode === "create";
  const onCode = creating && step === "code";

  return (
    <main
      className="orb-field hex-field"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <Link href="/" style={{ marginBottom: 26 }}>
        <Logo size={36} href={null} />
      </Link>

      <div className="auth-card animate-fade-up" style={{ width: "min(440px, 100%)" }}>
        {/* tab switch */}
        <div
          style={{
            display: "flex",
            background: "rgba(26,21,16,0.05)",
            borderRadius: 999,
            padding: 4,
            marginBottom: 26,
          }}
        >
          {(["create", "signin"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setStep("account");
              }}
              className="btn"
              style={{
                flex: 1,
                padding: "9px 0",
                fontSize: 14,
                background: mode === m ? "var(--surface)" : "transparent",
                color: mode === m ? "var(--ink)" : "var(--ink-soft)",
                boxShadow: mode === m ? "0 2px 8px rgba(60,40,0,0.08)" : "none",
              }}
            >
              {m === "create" ? "Create account" : "Sign in"}
            </button>
          ))}
        </div>

        <h1 style={{ fontSize: "1.7rem" }}>
          {onCode ? "Join your hive" : creating ? "Create your account" : "Welcome back"}
        </h1>
        <p style={{ color: "var(--ink-soft)", marginTop: 8, fontSize: 14.5 }}>
          {onCode
            ? "Enter the code your co-op gave you to find your local hive."
            : creating
              ? "A student account — the start of everything you can reach."
              : "Sign in to your hive."}
        </p>

        <form onSubmit={go} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          {onCode ? (
            <>
              <Field label="Hive join code">
                <input
                  className="field mono"
                  defaultValue="PEORIA24"
                  style={{ letterSpacing: "0.18em", textAlign: "center", fontSize: 18, fontWeight: 700 }}
                />
              </Field>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(244,190,18,0.14)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 13.5,
                  color: "var(--ink)",
                }}
              >
                <span style={{ fontSize: 18 }}>📍</span>
                <span>
                  Match found: <strong>Peoria Hive</strong> · Peoria, Illinois
                </span>
              </div>
            </>
          ) : (
            <>
              {creating && (
                <Field label="Full name">
                  <input className="field" placeholder="Hailey Deckard" />
                </Field>
              )}
              <Field label="Email">
                <input className="field" type="email" placeholder="hailey@email.com" />
              </Field>
              <Field label="Password">
                <input className="field" type="password" placeholder="••••••••" />
              </Field>
              {creating && (
                <Field label="I am a">
                  <select className="field" defaultValue="student">
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="teacher">Teaching parent / co-op leader</option>
                  </select>
                </Field>
              )}
            </>
          )}

          <button type="submit" className="btn btn-honey" style={{ marginTop: 8, padding: "14px 0" }}>
            {onCode ? "Enter HoneyComb →" : creating ? "Continue →" : "Sign in →"}
          </button>
        </form>

        <p className="mono" style={{ textAlign: "center", marginTop: 20, fontSize: 11.5, color: "var(--ink-soft)" }}>
          Concept demo — any details work.
        </p>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{label}</span>
      {children}
    </label>
  );
}
