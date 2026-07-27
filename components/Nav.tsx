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
//     Fotoğraf sonuna kadar akar, hiçbir yeri örtülmez.
// Büyütürsen fotoğrafın son pikselleri nav'ın opak zemini altında kalır.
const SWITCH_AT = 0;

/* ------------------------------------------------------------------
   Ölçüler artık sabit değil, görüntü alanına bağlı.

   420 piksel genişlikte COMPACT değerleri, 1600'de DESKTOP değerleri
   geçerli; arada doğrusal olarak geçiş yapılıyor.

   Yükseklik 560 pikselin altına düştüğünde (yatay telefon) genişlik ne
   olursa olsun ölçek 0.35'te tutuluyor — orada sorun genişlik değil,
   nav'ın dikeyde kapladığı yer.
------------------------------------------------------------------ */
type Metrics = {
  logo: number;
  font: number;
  padY: number;
  padX: number;
  gap: number;
};

const COMPACT: Metrics = { logo: 22, font: 9, padY: 14, padX: 20, gap: 16 };
const DESKTOP: Metrics = { logo: 30, font: 10, padY: 24, padX: 48, gap: 36 };

const REF_MIN = 420;
const REF_MAX = 1600;
const SHORT_SCREEN = 560;
const SHORT_SCREEN_CAP = 0.35;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function measure(): Metrics {
  const w = window.innerWidth;
  const h = window.innerHeight;

  let t = (w - REF_MIN) / (REF_MAX - REF_MIN);
  t = Math.min(1, Math.max(0, t));
  if (h < SHORT_SCREEN) t = Math.min(t, SHORT_SCREEN_CAP);

  return {
    logo: Math.round(lerp(COMPACT.logo, DESKTOP.logo, t)),
    font: Math.round(lerp(COMPACT.font, DESKTOP.font, t) * 10) / 10,
    padY: Math.round(lerp(COMPACT.padY, DESKTOP.padY, t)),
    padX: Math.round(lerp(COMPACT.padX, DESKTOP.padX, t)),
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
  // Sabit piksel eşiği yok — hero ne kadar uzunsa o kadar açık kalır.
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
