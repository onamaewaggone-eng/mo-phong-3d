"use client";

import dynamic from "next/dynamic";

const HoahocLabApp = dynamic(
  () =>
    import("@/components/sites/hoahoc-lab/HoahocLabApp").then(
      (m) => m.HoahocLabApp
    ),
  { ssr: false }
);

export default function HomePage() {
  return <HoahocLabApp />;
}

