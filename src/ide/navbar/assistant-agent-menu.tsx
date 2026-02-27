/**
 * @description: IDE 최우측에 위치하며 AI 어시스턴트(Gemini, GenAI) 패널을 전환하거나 토글하는 수직 메뉴 바
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (useSidebarStore)
 * @refactor-suggestions: 보더 명암비 최적화(50% 하향) 및 인터랙션 피드백 복원 완료.
 */
"use client";

import React from "react";
import { Bot, Play } from "lucide-react";
import { useSidebarStore } from "@/store/use-sidebar-store";

export default function AssistantAgentMenu() {
  // [훅 명세]: 우측 패널의 타입(Gemini/GenAI)을 상태로 관리하여 조건부 렌더링에 활용함.
  const { rightPanelType, setRightPanelType } = useSidebarStore();

  const menuItems = [
    { id: "gemini", icon: Bot, label: "AI Agent (Gemini)" },
    { id: "genai", icon: Play, label: "GenAI Worker" },
  ] as const;

  return (
    <nav className="flex w-[52px] flex-col items-center border-l border-border bg-background py-4 select-none">
      <div className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = rightPanelType === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setRightPanelType(item.id)}
              className={`group relative flex h-12 w-12 items-center justify-center transition-all rounded-md mx-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:text-foreground ${
                isActive
                  ? "text-primary bg-accent/20 shadow-sm"
                  : "text-muted-foreground/80 hover:bg-accent/10"
              }`}
              title={item.label}
            >
              {/* Active Indicator (Right border style like VS Code, but modernized) */}
              {isActive && (
                <div className="absolute right-[-1px] h-[24px] w-[2px] bg-primary rounded-l-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              )}

              <Icon
                size={24}
                className="transition-all active:scale-90 group-hover:scale-110"
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
