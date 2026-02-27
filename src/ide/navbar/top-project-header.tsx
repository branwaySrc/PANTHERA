/**
 * @description 애플리케이션 상단의 프로젝트 정보 및 전역 검색 기능을 제공하는 헤더 컴포넌트
 * @last-updated 2026-02-24
 * @type Client
 * @state-management None (순수 UI 컴포넌트)
 * @refactor-suggestions: 로고 이미지 인입 최적화 및 h-14 레이아웃 정렬 완료.
 */
"use client";

import React from "react";
import { BookOpen, Search, Command } from "lucide-react";
import Image from "next/image";

export default function TopProjectHeader() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-border bg-card/50 px-4 text-[12px] text-muted-foreground shadow-sm select-none backdrop-blur-md">
      {/* Left section: Logo & Project Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-white/30 bg-background/50">
            <Image
              src="/logo/ROUNDED_SYMBOL_DARK.svg"
              alt="Panthera Logo"
              fill
              unoptimized
              className="object-contain p-1"
            />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-foreground">
            Panthera
          </span>
        </div>
        <div className="h-4 w-[1px] bg-border/40" />
        <span className="font-medium text-muted-foreground/60 transform translate-y-[1px]">
          src/app/layout.tsx
        </span>
      </div>

      {/* Center section: Global Search Bar */}
      <div className="absolute left-1/2 flex w-[350px] -translate-x-1/2 items-center gap-2 rounded-md border border-border bg-background/40 px-3 py-2 transition-all hover:border-accent-foreground/30 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-ring">
        <Search size={14} className="text-muted-foreground/70" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground/40 text-[13px]"
        />
        <div className="flex items-center gap-0.5 rounded border border-border/50 bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/70 shadow-sm">
          <span className="scale-90">
            <Command size={10} />
          </span>
          K
        </div>
      </div>

      {/* Right section: Docs & Profile */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors hover:bg-accent/10 hover:text-foreground">
          <BookOpen size={14} />
          <span className="font-medium">Docs</span>
        </button>
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border/50 bg-muted shadow-inner">
          <Image
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Panthera"
            alt="User Profile"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
