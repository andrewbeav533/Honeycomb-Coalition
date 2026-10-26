import Link from "next/link";

export default function Logo({
  size = 34,
  wordmark = true,
  href = "/",
}: {
  size?: number;
  wordmark?: boolean;
  href?: string | null;
}) {
  const inner = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="HoneyComb" width={size} height={size} style={{ display: "block" }} />
      {wordmark && (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: size * 0.56,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          Honey<span style={{ color: "var(--honey-deep)" }}>Comb</span>
        </span>
      )}
    </span>
  );
  if (href === null) return inner;
  return <Link href={href}>{inner}</Link>;
}
