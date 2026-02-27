/**
 * @description: Git 소스 제어 상태와 변경 사항을 표시하는 패널 (현재 UI 레이아웃만 구현됨)
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: None
 * @refactor-suggestions: 디자인 시스템이 Shadcn UI 다크모드로 통일되었습니다.
 */
"use client";

import React from "react";
import { MoreHorizontal, GitBranch, Check } from "lucide-react";

export default function SourceControlPanel() {
  return (
    <div className="flex h-full w-full flex-col select-none bg-transparent">
      {/* Panel Header */}
      <div className="flex h-10 items-center justify-between px-4 border-b border-border/50">
        <span className="text-[11px] font-semibold tracking-widest text-muted-foreground/80">
          SOURCE CONTROL
        </span>
        <div className="flex items-center gap-1">
          <button className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1 transition-colors">
            <Check size={14} />
          </button>
          <button className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1 transition-colors">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center gap-2 text-[11px] text-foreground/90 bg-accent/30 w-fit px-2 py-1 rounded-md border border-border/50">
          <GitBranch size={12} className="text-primary" />
          <span className="font-bold tracking-tight">main*</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-20 text-center text-[13px] text-muted-foreground/60 italic">
        No changes detected.
      </div>
    </div>
  );
}
