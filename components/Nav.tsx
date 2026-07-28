"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import EamoLogo from "@/components/EamoLogo";

interface NavProps {
  transparent?: boolean;
}

// Hero üzerindeyken kullanılan açık ton — sitenin kırık beyazı, saf beyaz değil
const LIGHT = "#F7F6F2";

// Renk değişim sınırı, ekranın tepesinden piksel cinsinden.
// 0 = fotoğrafın alt kenarı ekranın tepesini geçtiği an değişir.
const SWITCH_AT = 0;

/* ------------------------------------------------------------------
   Ölçüler görüntü alanına bağlı.

   375 piksel genişlikte (iPhone) COMPACT, 1600'de DESKTOP değerleri
   geçerli; arada doğrusal geçiş var.

   İki ayrı ölçek kullanılıyor:
   - Yatay boşluk (padX) her zaman yalnızca GENİŞLİĞE bakar. Böylece
     app/page.tsx içindeki clamp() ile birebir aynı değeri üretir ve
     logo, altındaki metinle aynı hizada başlar.
   - Diğer ölçüler kısa ekranlarda (yatay telefon, yükseklik < 560)
     ayrıca kısılır — orada sorun genişlik değil, nav'ın dikeyde
     kapladığı yer.
------------------------------------------------------------------ */
type Metrics = {
  logo: number;
  font: number;
  padY: number;
  padX: number;
  gap: number;
};

const COMPACT: Metrics = { logo: 19, font: 8.5, padY: 12, padX: 16, gap: 11 };
const DESKTOP: Metrics = { logo: 30, font: 10, padY: 24, padX: 48, gap: 36 };

const REF_MIN = 375;
const REF_MAX = 1600;
const SHORT_SCREEN = 560;
const SHORT_SCREEN_CAP = 0.35;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function measure(): Metrics {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const tW = Math.min(1, Math.max(0, (w - REF_MIN) / (REF_MAX - REF_MIN)));
  const t = h < SHORT_SCREEN ? Math.min(tW, SHORT_SCREEN_CAP) : tW;

  return {
    logo: Math.round(lerp(COMPACT.logo, DESKTOP.logo, t)),
    font: Math.round(lerp(COMPACT.font, DESKTOP.font, t) * 10) / 10,
    padY: Math.round(lerp(COMPACT.padY, DESKTOP.padY, t)),
    padX: Math.round(lerp(COMPACT.padX, DESKTOP.padX, tW)),
    gap: Math.round(lerp(COMPACT.gap, DESKTOP.gap, t)),
  };
}

export default function Nav({ transparent = false }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Sunucuda window yok; masaüstü değerleriyle başlayıp ilk karede ölçüyoruz.
  const [m, setM] = useState<Metrics>(DESKTOP);

  useEffect(() => {
    let ticking = false;
    const apply = () => setM(measure());
    const onResize = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        apply();
        ticking = false;
      });
    };

    apply();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // Nav, hero'nun alt kenarı SWITCH_AT çizgisini geçtiğinde koyu moda döner.
  const update = useCallback(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) {
      setScrolled(window.scrollY > 80);
      return;
    }
    setScrolled(hero.getBoundingClientRect().bottom <= SWITCH_AT);
  }, []);

  useEffect(() => {
    if (!transparent) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update(); // ilk yüklemede de doğru durumla başla
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [transparent, update]);

  const isLight = transparent && !scrolled;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: `${m.gap}px`,
        padding: `${m.padY}px ${m.padX}px`,
        background: isLight ? "transparent" : "var(--bg)",
        transition: "background 0.3s ease",
      }}
    >
      <Link href="/" style={{ display: "block", lineHeight: 0, flexShrink: 0 }}>
        <EamoLogo
          height={m.logo}
          style={{
            color: isLight ? LIGHT : "var(--ink)",
            transition: "color 0.3s ease",
          }}
        />
      </Link>

      <div style={{ display: "flex", gap: `${m.gap}px`, flexShrink: 0 }}>
        {[
          { label: "COLLECTIBLE", href: "/objects" },
          { label: "OBJECTS", href: "/objects" },
          { label: "ABOUT", href: "/about" },
          { label: "CONTACT", href: "/contact" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              fontFamily: "var(--sans)",
              fontSize: `${m.font}px`,
              fontWeight: 300,
              letterSpacing: "0.14em",
              whiteSpace: "nowrap",
              color: isLight
                ? LIGHT
                : pathname === href
                ? "var(--ink)"
                : "var(--ink-light)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
