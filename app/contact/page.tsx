import Link from "next/link";
import Nav from "@/components/Nav";

export default function Contact() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <Nav />
      <section style={{ padding: "80px 48px 160px", maxWidth: "700px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "var(--sans)",
          fontSize: "10px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ink-light)",
          fontWeight: 300,
          marginBottom: "64px",
        }}>Contact</p>

        <p style={{
          fontFamily: "var(--sans)",
          fontSize: "28px",
          fontWeight: 300,
          lineHeight: 1.4,
          color: "var(--ink)",
          marginBottom: "64px",
          letterSpacing: "0.01em",
        }}>
          For inquiries about objects, commissions, or collaborations.
        </p>

        <a href="mailto:hello@studioeamo.com" style={{
          fontFamily: "var(--sans)",
          fontSize: "20px",
          fontWeight: 300,
          color: "var(--ink)",
          textDecoration: "none",
          display: "block",
          marginBottom: "16px",
          letterSpacing: "0.02em",
        }}>hello@studioeamo.com</a>

        <a href="https://instagram.com/studioeamo" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "var(--sans)",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink-light)",
          textDecoration: "none",
          fontWeight: 300,
        }}>@studioeamo</a>
      </section>

      <footer style={{
        borderTop: "1px solid var(--rule)",
        padding: "40px 48px",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 300, color: "var(--ink-light)", textDecoration: "none" }}>Studio EAMO — Istanbul</Link>
        <span style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 300, color: "var(--ink-light)" }}>hello@studioeamo.com</span>
        <a href="https://instagram.com/studioeamo" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 300, color: "var(--ink-light)", textDecoration: "none" }}>@studioeamo</a>
      </footer>
    </main>
  );
}
