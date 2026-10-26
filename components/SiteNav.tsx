import Link from "next/link";
import Logo from "./Logo";

export default function SiteNav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        padding: "14px 20px",
      }}
    >
      <nav
        className="glass"
        style={{
          width: "min(1080px, 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px 10px 18px",
          borderRadius: 999,
        }}
      >
        <Logo size={30} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="nav-links">
          <a href="/#how" className="nav-pill">How it works</a>
          <a href="/#perks" className="nav-pill">Perks</a>
          <a href="/#safe" className="nav-pill">Safety</a>
          <Link href="/login" className="nav-pill" style={{ color: "var(--ink)" }}>Sign in</Link>
          <Link href="/login" className="btn btn-honey" style={{ padding: "10px 18px", fontSize: 14 }}>
            Create account
          </Link>
        </div>
      </nav>
    </header>
  );
}
