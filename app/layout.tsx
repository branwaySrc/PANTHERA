/**
 * @description 애플리케이션의 기본 레이아웃을 정의하며 Shadcn UI 다크 모드 테마를 기반으로 함.
 * @last-updated 2026-02-24
 * @type Client
 * @state-management Zustand (Layout은 상태를 직접 관리하지 않으나 하위 스토어들을 감쌈)
 * @refactor-suggestions: 디자인 시스템이 Shadcn UI 다크모드로 통일되었습니다.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panthera | Content IDE",
  description: "AI-powered Content IDE",
  icons: {
    icon: "/logo/ROUNDED_SYMBOL_DARK.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
