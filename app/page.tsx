import Link from "next/link";
import Nav from "@/components/Nav";
import HeroSlideshow from "@/components/HeroSlideshow";

/* ------------------------------------------------------------------
   Duyarlı ölçüler.

   Inline style'lar medya sorgusu tutamıyor, ama clamp() ve calc()
   birer CSS değeri — inline style objesinin içinde sorunsuz çalışırlar.
   Her biri 375 piksel ekranda alt sınıra, 1600'de üst sınıra oturur.

   PAD_X, Nav.tsx'in ürettiği yatay boşlukla birebir aynı eğriyi
   izler (16px → 48px). Logo ile altındaki metin bu yüzden her
   genişlikte aynı hizada başlar. Birini değiştirirsen diğerini de
   değiştir, yoksa hizalama bozulur.
------------------------------------------------------------------ */
const PAD_X = "clamp(16px, calc(6.204px + 2.612vw), 48px)";   // 16 → 48
const PAD_Y = "clamp(64px, calc(46.86px + 4.571vw), 120px)";  // 64 → 120
const COL_GAP = "clamp(40px, calc(27.75px + 3.265vw), 80px)"; // 40 → 80
const LEAD = "clamp(17px, calc(16.08px + 0.245vw), 20px)";    // 17 → 20

export default function Home() {
  return (
    <main>
      {/* Transparent nav üstte */}
      <Nav transparent={true} />

      {/* Hero — slideshow kendi yüksekliğini kurar */}
      <section data-hero style={{
        position: "relative",
        width: "100%",
      }}>
        <HeroSlideshow />
        {/* Çok hafif üst gradient — nav okunabilirliği için */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </section>

      {/* İkinci bölüm — stüdyo tanımı.
          auto-fit + minmax: iki sütun sığmadığında kendiliğinden tek
          sütuna iner. Medya sorgusu gerekmiyor. */}
      <section style={{
        padding: `${PAD_Y} ${PAD_X}`,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: COL_GAP,
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <div>
          <p style={{
            fontFamily: "var(--sans)",
            fontSize: LEAD,
            fontWeight: 300,
            lineHeight: 1.7,
            color: "var(--ink)",
            letterSpacing: "0.01em",
          }}>
            Studio EAMO is an independent contemporary design practice based in Istanbul. Working across brand identity, creative direction, objects and image-making, the studio explores the relationship between material, memory and form.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          {[
            { label: "Collectible", href: "/objects" },
            { label: "Objects", href: "/objects" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }, i, arr) => (
            <Link key={label} href={href} style={{
              fontFamily: "var(--sans)",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid var(--rule)",
              borderBottom: i === arr.length - 1 ? "1px solid var(--rule)" : "none",
              padding: "20px 0",
            }}>
              <span>{label}</span>
              <span style={{ marginLeft: "auto", opacity: 0.35 }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Objects preview */}
      <section style={{
        padding: `0 ${PAD_X} clamp(48px, calc(38.2px + 2.612vw), 80px)`,
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "16px",
          marginBottom: "clamp(28px, 3vw, 48px)",
          borderTop: "1px solid var(--rule)",
          paddingTop: "28px",
        }}>
          <span style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-light)",
            fontWeight: 300,
          }}>Poetic Collectibles</span>
          <Link href="/objects" style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-light)",
            textDecoration: "none",
            fontWeight: 300,
            whiteSpace: "nowrap",
          }}>View all →</Link>
        </div>

        {/* Üç kare telefonda da yan yana kalıyor. Alt alta inmesini
            istersen: "repeat(auto-fit, minmax(240px, 1fr))" */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {[
            { bg: "#2C2926", label: "Archeo I", mat: "Stoneware, black" },
            { bg: "#E2DED8", label: "White I", mat: "Stoneware, raw white" },
            { bg: "#3A3530", label: "Archeo II", mat: "Stoneware, black" },
          ].map((item, i) => (
            <div key={i} style={{ position: "relative" }}>
              <div style={{
                background: item.bg,
                aspectRatio: "1/1",
              }} />
              <div style={{ paddingTop: "12px" }}>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(11px, 1.1vw, 13px)",
                  fontWeight: 300,
                  color: "var(--ink)",
                  marginBottom: "4px",
                  letterSpacing: "0.02em",
                }}>{item.label}</p>
                <p style={{
                  fontFamily: "var(--sans)",
                  fontSize: "clamp(9px, 0.9vw, 10px)",
                  letterSpacing: "0.1em",
                  color: "var(--ink-light)",
                  textTransform: "uppercase",
                  fontWeight: 300,
                }}>{item.mat}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer — dar ekranda alt alta sarar */}
      <footer style={{
        borderTop: "1px solid var(--rule)",
        padding: `clamp(28px, 3vw, 40px) ${PAD_X}`,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px 24px",
      }}>
        <span style={{
          fontFamily: "var(--sans)",
          fontSize: "12px",
          fontWeight: 300,
          color: "var(--ink-light)",
          letterSpacing: "0.06em",
        }}>Studio EAMO — Istanbul</span>
        <a href="mailto:hello@studioeamo.com" style={{
          fontFamily: "var(--sans)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--ink-light)",
          textDecoration: "none",
          fontWeight: 300,
        }}>hello@studioeamo.com</a>
        <a href="https://instagram.com/studioeamo" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "var(--sans)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--ink-light)",
          textDecoration: "none",
          fontWeight: 300,
        }}>@studioeamo</a>
      </footer>
    </main>
  );
}
