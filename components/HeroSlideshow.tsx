"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /* Fotoğrafın hangi bandının görüneceği.
     0%   = en üst şerit
     50%  = orta
     100% = en alt şerit
     Yalnızca fotoğraf ekrandan yüksek kaldığında etkili olur. */
  focus: string;
};

const PHOTOS: Slide[] = [
  { src: "/DSC01784.jpg", alt: "", width: 2400, height: 1600, focus: "50%" },                        // 0 — gri kutu
  { src: "/hero.jpg", alt: "Studio EAMO — Archeo Series", width: 4928, height: 3280, focus: "79%" }, // 1 — ikili, doğa
  { src: "/DSC01781.jpg", alt: "", width: 2400, height: 1600, focus: "50%" },                        // 2 — kahve kutu
];

// Gösterim sırası. Aynı fotoğraf birden çok kez geçebilir.
// gri → doğa → kahve → doğa → (başa)
//
// Dört geçişin dördünde de araya doğa fotoğrafı giriyor, yani masa üstünde
// çekilmiş iki kare hiçbir yerde arka arkaya gelmiyor. Üç fotoğrafla bunu
// sağlayan tek dizi bu; daha uzun bir dizi kurmak dördüncü fotoğraf ister.
const SEQUENCE = [0, 1, 2, 1];

const INTERVAL = 5000;      // her fotoğraf 5 saniye
const FADE_FULL = 2500;     // normal geçiş
const FADE_REDUCED = 600;   // "Hareketi Azalt" açıkken kısa geçiş

/* Hero yüksekliği:
   - Geniş ekranda ekran yüksekliği kadar (100svh) — fotoğraf ekranı doldurur,
     taşan kısım kırpılır, hangi bandın kalacağını focus belirler.
   - Dar ekranda fotoğrafın kendi yüksekliği (66.667vw = 3:2 oranı) daha küçük
     kalır, o zaman min() onu seçer ve hiçbir şey kırpılmaz.
   svh, telefon tarayıcılarının kaybolan adres çubuğunu hesaba katar. */
const HERO_HEIGHT = "min(100svh, 66.667vw)";

export default function HeroSlideshow() {
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Döngü her hâlükârda çalışır; hareket ayarı yalnızca geçiş süresini kısaltır.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % SEQUENCE.length);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  const fade = reduced ? FADE_REDUCED : FADE_FULL;
  const active = SEQUENCE[step];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: HERO_HEIGHT,
        overflow: "hidden",
      }}
    >
      {PHOTOS.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="100vw"
          priority={i === 0}
          quality={85}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `center ${photo.focus}`,
            display: "block",
            opacity: i === active ? 1 : 0,
            transition: `opacity ${fade}ms ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
