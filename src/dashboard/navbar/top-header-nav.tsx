/**
 * @description: 대시보드 상단 내비게이션 바 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: None (Stateless)
 * @refactor-suggestions: 대시보드 컴포넌트 분리를 통한 유지보수성 향상. 각 모듈은 독립적인 상태 관리가 가능하도록 설계됨.
 */
// [UPDATE: 2026-02-24] "대시보드 모듈화에 따른 컴포넌트 분리"
"use client";

import React from "react";
import { Code2 } from "lucide-react";

export default function TopHeaderNav() {
  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 p-1.5">
          <Code2 className="text-primary" size={18} />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-foreground">
          Panthera
        </span>
      </div>

      {/* Right side: Avatar */}
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border bg-muted">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 text-[11px] font-bold text-foreground">
            PA
          </div>
        </div>
      </div>
    </header>
  );
}
