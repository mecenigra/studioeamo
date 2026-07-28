"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";

const D =
  "M841.09,185.49c-17.89,28.75-53.64,25.17-80.75,3.27-17.64-14.25-30.38-32.63-40.96-52.7l-15.38-29.2c-1.52-2.89-6.3-5.52-9.07-5.47-10.48.19-15.22,19.88-32.66,36.29-11.63,10.94-27.46,15.86-42.47,10.18-11.12-4.21-21-11.01-27.24-20.93l-17.16-27.3c-3.48-5.54-6.8-11.18-11.3-15.78-5.82-5.95-15.06-5.59-20.32,1.24-5.95,7.71-10.73,16.88-14.15,26.28l-12.87,35.37c-4.36,11.99-10.89,23.93-21.99,23.49-14.46-.58-19.91-21.38-26.3-35.33l-13.19-28.83c-.91-1.98-4.59-4.12-6.49-4.53-8.01-1.71-14.54,13.54-19.3,24.66l-18.13,42.34c-4.25,9.94-10.16,19.16-17.54,26.69-12.58,12.84-31.84,13.22-44.51.61-7.79-7.75-13.46-17.49-16.06-28.37l-10.48-43.84c-5.07-21.21-12.58-52.16-35.29-54.51-17.44-1.8-32.93,19.51-41.41,35.5l-23.12,43.59c-14.69,27.7-32.44,60.44-59.27,76.46-17.45,10.42-37.28,13.32-57.44,13.38-44.59.14-84.73-12.45-98.61-57.73C-4.88,139.58-2.63,83.91,19.12,47.06,35.34,19.57,64.27,3.5,96.33,5.5c18.03,1.12,22.88,8.51,21.46,25.11-1.26,14.77-7.24,23.16-23.03,25.17-14.94,1.9-28.57,7.13-39.54,17.36-13.54,12.63-22.54,28.98-23.86,47.45-1.3,18.26,8.66,33.59,25,41.01,13.17,5.98,26.75,6.37,41.13,6.8,31.35.95,59.56-11.34,78.99-35.88,7.95-10.03,15.03-20.07,22.11-30.9l28.3-43.3c12.1-18.52,34.04-41.74,56.09-42.4,28.43-.86,42.26,26.42,50.02,51.86l11.86,38.86c4.04,13.24,13.36,31.55,25.18,32.39,5.29.38,11.15-1.62,15.07-5.45,20.06-19.65,33.84-57.23,44.43-85.1l7.46-16.16c1.56-3.38,7.28-5.86,10.77-5.82,3.3.04,9.33,3.33,10.85,7.26l17.91,46.23c5.6,14.46,14.93,32.28,24.26,22.29,3.77-4.04,6.81-9.03,9.17-14.14l15.6-33.9c7.25-15.76,21-32.98,36.55-26.44,8.84,3.72,15.34,10.83,21.45,18.06,14.12,16.73,34.13,40.64,55.18,40.74,24.61.12,39.53-22.95,51.44-43.14,3.38-5.74,10.78-10.83,17.33-6.48,12.4,8.25,13.92,45.13,44.82,72.3,20.54,18.06,52.53,31.99,72.31,14.03,8.28-7.51,12.19-22.68,11.27-35.1-1.03-13.9-9.84-25.87-22.53-32.6-12.24-6.49-26.19-6.89-40.05-5.82l-14.62,1.13c-7.52.58-14.02-4.93-16.8-9.96-3.8-6.87-3.07-14.85,1.56-20.83,5.23-6.74,12.88-10.93,20.97-13.65,30.88-10.36,67.18-11.1,82.4,19.51,19.6,39.42,16.89,123.17-5.73,159.53ZM294.32,163.34c-3.45-5.4-9.77-12.72-15.48-15.15-3.34-1.42-7.03-.73-9.4,2.06-1.18,1.39-2.09,3.05-2.57,4.88-1.4,5.38-2.09,10.95-1.65,16.47.53,6.68,6.16,9.13,12.6,8.45,4.52-.48,8.89-1.56,13.1-3.27,3.76-1.53,6.5-4.76,5.5-8.68-.43-1.68-1.15-3.28-2.1-4.78ZM109.83,128.6c3.89-3.4,4.09-8.85.42-12.44-2.3-2.24-4-4.57-4.81-7.75-1.04-4.09-3.32-9.51-7.63-10.34-2.46-.47-4.82.78-6.19,2.81-1.25,1.85-1.93,3.97-2.32,6.19-.84,4.73-1.17,9.42-1.03,14.21.18,6.03,2.39,11.5,9.24,11.76,4.65.17,8.99-1.54,12.32-4.44Z";

const VIEW_BOX = "0 0 859.94 238.04";

export type EamoLogoVariant = "sweep" | "draw" | "focus";

type Props = {
  /** Animasyon karakteri. sweep: yumuşak geçiş · draw: kontur→dolgu · focus: netleşme */
  variant?: EamoLogoVariant;
  /** false ise hiç animasyon çalışmaz, logo doğrudan yerinde durur */
  animate?: boolean;
  /** Yükseklik. Genişlik orana göre kendi hesaplanır. */
  height?: number | string;
  style?: CSSProperties;
  className?: string;
  title?: string;
};

export default function EamoLogo({
  variant = "sweep",
  animate = true,
  height = 28,
  style,
  className,
  title = "Studio EAMO",
}: Props) {
  const uid = useId().replace(/:/g, "");
  const [play, setPlay] = useState(false);

  // Sunucuda ve ilk boyamada statik: hidrasyon uyuşmazlığı olmaz.
  // Hareket azaltma açıksa animasyon hiç başlamaz.
  useEffect(() => {
    if (!animate) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    setPlay(true);
  }, [animate]);

  const svgProps = {
    viewBox: VIEW_BOX,
    xmlns: "http://www.w3.org/2000/svg",
    role: "img" as const,
    "aria-label": title,
    className,
    style: {
      display: "block",
      height,
      width: "auto",
      color: "inherit",
      ...style,
    } as CSSProperties,
  };

  if (!play) {
    return (
      <svg {...svgProps}>
        <path d={D} fill="currentColor" />
      </svg>
    );
  }

  if (variant === "draw") {
    return (
      <svg {...svgProps}>
        <path
          d={D}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={4}
          strokeDasharray="1 1"
          strokeDashoffset={1}
          opacity={0.85}
        >
          <animate
            attributeName="stroke-dashoffset"
            values="1;0"
            dur="1.9s"
            calcMode="spline"
            keySplines="0.65 0 0.35 1"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            values="0.85;0.85;0"
            keyTimes="0;0.3;1"
            begin="1.5s"
            dur="1.1s"
            fill="freeze"
          />
        </path>
        <path d={D} fill="currentColor" opacity={0}>
          <animate
            attributeName="opacity"
            values="0;1"
            begin="1.4s"
            dur="1.2s"
            calcMode="spline"
            keySplines="0.33 1 0.68 1"
            fill="freeze"
          />
        </path>
      </svg>
    );
  }

  if (variant === "focus") {
    return (
      <svg {...svgProps}>
        <defs>
          <filter
            id={`f-${uid}`}
            x="-10%"
            y="-30%"
            width="120%"
            height="160%"
          >
            <feGaussianBlur stdDeviation={6}>
              <animate
                attributeName="stdDeviation"
                values="6;0"
                dur="1.4s"
                calcMode="spline"
                keySplines="0.16 1 0.3 1"
                fill="freeze"
              />
            </feGaussianBlur>
          </filter>
        </defs>
        <g filter={`url(#f-${uid})`} opacity={0} transform="translate(0 9)">
          <animate
            attributeName="opacity"
            values="0;1"
            dur="1.1s"
            calcMode="spline"
            keySplines="0.33 1 0.68 1"
            fill="freeze"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 9;0 0"
            dur="1.4s"
            calcMode="spline"
            keySplines="0.16 1 0.3 1"
            fill="freeze"
          />
          <path d={D} fill="currentColor" />
        </g>
      </svg>
    );
  }

  // sweep — varsayılan
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient
          id={`g-${uid}`}
          gradientUnits="userSpaceOnUse"
          x1={-300}
          y1={0}
          x2={0}
          y2={0}
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
          <animate
            attributeName="x1"
            values="-300;860"
            dur="1.8s"
            calcMode="spline"
            keySplines="0.22 1 0.36 1"
            fill="freeze"
          />
          <animate
            attributeName="x2"
            values="0;1160"
            dur="1.8s"
            calcMode="spline"
            keySplines="0.22 1 0.36 1"
            fill="freeze"
          />
        </linearGradient>
        <mask id={`m-${uid}`}>
          <rect
            x="0"
            y="0"
            width="859.94"
            height="238.04"
            fill={`url(#g-${uid})`}
          />
        </mask>
      </defs>
      <path d={D} fill="currentColor" mask={`url(#m-${uid})`} />
    </svg>
  );
}
