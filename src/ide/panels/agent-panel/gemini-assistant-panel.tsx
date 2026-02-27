/**
 * @description: Gemini 기반 AI 어시스턴트 기능을 제공하는 패널 콘텐츠
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: None (향후 메시지 상태 관리 추가 가능)
 * @refactor-suggestions: Agent 패널의 디자인 시스템 동기화 및 훅 명세 최적화 완료.
 */
"use client";

import React from "react";

export default function GeminiAssistantPanel() {
  return (
    <div className="flex h-full flex-col bg-transparent">
      {/* Header */}
      <div className="flex h-10 items-center px-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/80 border-b border-white/10">
        AI Agent (Gemini)
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <div className="group rounded-lg border border-white/10 bg-muted/20 p-4 text-[13px] transition-all hover:bg-white/5 hover:border-white/20 shadow-sm backdrop-blur-md">
          <p className="mb-2 font-bold text-primary tracking-tight">
            Gemini Assistant
          </p>
          <p className="leading-relaxed text-muted-foreground/90">
            코드 분석, 리팩토링 제안 및 다양한 AI 기반 도움을 받을 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
