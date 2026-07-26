import Nav from "@/components/Nav";
import Link from "next/link";

export default function About() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <Nav />
      <section style={{ padding: "80px 48px 160px", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "var(--sans)",
          fontSize: "10px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--ink-light)",
          fontWeight: 300,
          marginBottom: "64px",
        }}>About</p>

        <p style={{
          fontFamily: "var(--sans)",
          fontSize: "clamp(20px, 3vw, 32px)",
          fontWeight: 300,
          lineHeight: 1.55,
          color: "var(--ink)",
          marginBottom: "80px",
          letterSpacing: "0.01em",
        }}>
          Studio EAMO is an independent contemporary design practice based in Istanbul. Working across brand identity, creative direction, objects and image-making, the studio explores the relationship between material, memory and form.
        </p>

        <div style={{
          borderTop: "1px solid var(--rule)",
          paddingTop: "48px",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "48px",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--sans)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-light)",
              fontWeight: 300,
              marginBottom: "20px",
            }}>Practice</p>
            {["Brand Identity", "Creative Direction", "Objects", "Image-making"].map((s) => (
              <p key={s} style={{
                fontFamily: "var(--sans)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--ink)",
                lineHeight: 2.2,
                letterSpacing: "0.02em",
              }}>{s}</p>
            ))}
          </div>

          <div>
            <p style={{
              fontFamily: "var(--sans)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-light)",
              fontWeight: 300,
              marginBottom: "20px",
            }}>Contact</p>
            <a href="mailto:hello@studioeamo.com" style={{
              fontFamily: "var(--sans)",
              fontSize: "18px",
              fontWeight: 300,
              color: "var(--ink)",
              textDecoration: "none",
              display: "block",
              marginBottom: "12px",
              letterSpacing: "0.02em",
            }}>hello@studioeamo.com</a>
            <a href="https://instagram.com/studioeamo" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--sans)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--ink-light)",
              textDecoration: "none",
              fontWeight: 300,
              textTransform: "uppercase",
            }}>@studioeamo</a>
          </div>
        </div>
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
