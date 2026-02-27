/**
 * @description: 제목을 클릭하여 본문 내용을 접거나 펼칠 수 있는 범용 아코디언 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: useState를 사용하여 개별 아코디언의 열림/닫힘(isOpen) 상태 관리
 * @refactor-suggestions: 보더 명암비 최적화(50% 하향) 및 인터랙션 피드백 복원 완료.
 */
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  title,
  children,
  defaultOpen = true,
}: AccordionProps) {
  // [훅 명세]: 아코디언의 확장/축소 상태를 제어함. (useState 브릿지)
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col border-b border-border/40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-full items-center gap-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/90 transition-all hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <div className="flex w-4 items-center justify-center">
          {isOpen ? (
            <ChevronDown
              size={14}
              className="text-muted-foreground transition-colors group-hover:text-foreground"
            />
          ) : (
            <ChevronRight
              size={14}
              className="text-muted-foreground transition-colors group-hover:text-foreground"
            />
          )}
        </div>
        <span className="truncate">{title}</span>
      </button>
      {isOpen && (
        <div className="flex flex-col py-1 bg-background/20 transition-all">
          {children}
        </div>
      )}
    </div>
  );
}
