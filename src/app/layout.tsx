import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "[MERGE] Hồ sơ Hóa học 4.0 · CT99",
  description: "Xưởng Ghép chất và Khám phá 319 hợp chất, 118 nguyên tố với mô hình 3D tương tác. Phát triển bởi TRUONG CONG TIEN - Chuyên gia Hóa học CT99.",
  authors: [{ name: "TRUONG CONG TIEN", url: "https://www.facebook.com/token.neverdie" }],
  keywords: ["Hóa học 4.0", "Ghép chất", "CT99", "Mô hình 3D", "TRUONG CONG TIEN", "Hóa học"],
  openGraph: {
    title: "[MERGE] Hồ sơ Hóa học 4.0 · CT99",
    description: "Xưởng Ghép chất và Khám phá 319 hợp chất với mô hình 3D tương tác cùng TRUONG CONG TIEN.",
    url: "https://ct99-chemistry.vercel.app",
    siteName: "CT99 Chemistry",
    type: "website",
  },
  icons: {
    icon: "/sites/merge/assets/se-app.ico",
    apple: "/sites/merge/assets/se-app.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark h-full antialiased" suppressHydrationWarning>
      <head>
        {/* eslint-disable @next/next/no-css-tags */}
        <link rel="stylesheet" href="/sites/merge/css/stellar-workspace.css" />
        <link rel="stylesheet" href="/sites/merge/css/bond-study.css" />
        <link rel="stylesheet" href="/sites/merge/css/science-workspace.css" />
        <link rel="stylesheet" href="/sites/merge/css/web-dossiers.css" />
        <link rel="stylesheet" href="/sites/merge/css/reaction-workspace.css" />
        <link rel="stylesheet" href="/sites/merge/css/interaction-polish.css" />
        <link rel="stylesheet" href="/sites/merge/css/classroom-polish.css" />
        <Script
          src="/sites/merge/js/vendor/three.module.js"
          strategy="beforeInteractive"
          type="module"
          crossOrigin="anonymous"
        />
        <Script
          src="/sites/merge/js/build-workspace.js"
          strategy="beforeInteractive"
          type="module"
          crossOrigin="anonymous"
        />
        <Script
          src="/sites/merge/js/reaction-workspace.js"
          strategy="beforeInteractive"
          type="module"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
