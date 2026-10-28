"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROLES = [
  { href: "/student", label: "Student" },
  { href: "/admin", label: "Co-op Admin" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/super-admin", label: "Super Admin" },
];

export default function RoleSwitcher() {
  const path = usePathname();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 5,
        borderRadius: 999,
      }}
      className="glass-strong"
    >
      <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-soft)", padding: "0 8px", letterSpacing: "0.08em" }}>
        DEMO
      </span>
      {ROLES.map((r) => {
        const active = path === r.href;
        return (
          <Link
            key={r.href}
            href={r.href}
            style={{
              padding: "7px 13px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              color: active ? "var(--black)" : "var(--ink-soft)",
              background: active ? "var(--honey)" : "transparent",
            }}
          >
            {r.label}
          </Link>
        );
      })}
    </div>
  );
}
