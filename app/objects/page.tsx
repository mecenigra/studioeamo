import Nav from "@/components/Nav";
import Link from "next/link";

const objects = [
  { id: "archeo-i", title: "Archeo I", material: "Stoneware, black glaze", year: "2024", dimensions: "18 × 9 × 9 cm", edition: "Unique", bg: "#2C2926" },
  { id: "archeo-ii", title: "Archeo II", material: "Stoneware, black glaze", year: "2024", dimensions: "12 × 10 × 10 cm", edition: "Unique", bg: "#3A3530" },
  { id: "archeo-iii", title: "Archeo III", material: "Stoneware, black glaze", year: "2024", dimensions: "14 × 12 × 12 cm", edition: "Unique", bg: "#403D3A" },
  { id: "white-i", title: "White I", material: "Stoneware, raw white", year: "2024", dimensions: "14 × 12 × 10 cm", edition: "Unique", bg: "#E2DED8" },
  { id: "white-ii", title: "White II", material: "Stoneware, raw white", year: "2024", dimensions: "18 × 13 × 12 cm", edition: "Unique", bg: "#E5E1DB" },
  { id: "white-iii", title: "White III", material: "Stoneware, raw white", year: "2024", dimensions: "15 × 14 × 13 cm", edition: "Unique", bg: "#E8E4DE" },
];

export default function Objects() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <Nav />
      <section style={{ padding: "80px 48px 64px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "1px solid var(--rule)",
          paddingBottom: "28px",
          marginBottom: "64px",
        }}>
          <div>
            <p style={{
              fontFamily: "var(--sans)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ink-light)",
              fontWeight: 300,
              marginBottom: "12px",
            }}>Studio EAMO</p>
            <h1 style={{
              fontFamily: "var(--sans)",
              fontSize: "clamp(28px, 5vw, 56px)",
              fontWeight: 300,
              lineHeight: 1,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}>Poetic Collectibles</h1>
          </div>
          <p style={{
            fontFamily: "var(--sans)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-light)",
            fontWeight: 300,
          }}>{objects.length} works</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "48px 2px",
        }}>
          {objects.map((obj) => (
            <div key={obj.id}>
              <div style={{
                background: obj.bg,
                aspectRatio: "4/5",
                marginBottom: "16px",
              }} />
              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                  <p style={{
                    fontFamily: "var(--sans)",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "var(--ink)",
                    letterSpacing: "0.02em",
                  }}>{obj.title}</p>
                  <span style={{
                    fontFamily: "var(--sans)",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    color: "var(--ink-light)",
                    fontWeight: 300,
                  }}>{obj.year}</span>
                </div>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink-light)",
                  fontWeight: 300,
                  marginBottom: "4px",
                }}>{obj.material}</p>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: "10px",
                  color: "var(--ink-light)",
                  fontWeight: 300,
                  marginBottom: "14px",
                  letterSpacing: "0.04em",
                }}>{obj.dimensions} — {obj.edition}</p>
                <a href={`mailto:hello@studioeamo.com?subject=Inquiry: ${obj.title}`} style={{
                  fontFamily: "var(--sans)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--ink)",
                  paddingBottom: "1px",
                  fontWeight: 300,
                }}>Inquire</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{
        borderTop: "1px solid var(--rule)",
        padding: "40px 48px",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "80px",
      }}>
        <Link href="/" style={{ fontFamily: "var(--sans)", fontSize: "12px", fontWeight: 300, color: "var(--ink-light)", textDecoration: "none" }}>Studio EAMO — Istanbul</Link>
        <span style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 300, color: "var(--ink-light)" }}>hello@studioeamo.com</span>
        <a href="https://instagram.com/studioeamo" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--sans)", fontSize: "11px", fontWeight: 300, color: "var(--ink-light)", textDecoration: "none" }}>@studioeamo</a>
      </footer>
    </main>
  );
}
