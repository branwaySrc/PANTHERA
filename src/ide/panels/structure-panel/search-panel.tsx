/**
 * @description: 텍스트 기반 검색 기능을 제공하는 패널 (현재 UI 레이아웃만 구현됨)
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: None
 * @refactor-suggestions: 디자인 시스템이 Shadcn UI 다크모드로 통일되었습니다.
 */
"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function SearchPanel() {
  return (
    <div className="flex h-full w-full flex-col select-none bg-transparent">
      {/* Panel Header */}
      <div className="flex h-10 items-center justify-between px-4 border-b border-border/50">
        <span className="text-[11px] font-semibold tracking-widest text-muted-foreground/80">
          SEARCH
        </span>
        <button className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1 transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <div className="px-4 py-4">
        <div className="relative flex items-center rounded-md border border-border bg-muted/30 px-3 py-1.5 focus-within:ring-1 focus-within:ring-ring transition-all">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none"
          />
        </div>
      </div>

      <div className="flex-1 px-4 py-20 text-center text-[13px] text-muted-foreground/60 italic">
        No search results found.
      </div>
    </div>
  );
}
