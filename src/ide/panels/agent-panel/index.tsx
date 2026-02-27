/**
 * @description: 우측 AI 어시스턴트 패널들을 감싸는 컨테이너로, 활성 패널 타입에 따른 렌더링 및 너비 조절(Resize) 기능을 제공함.
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (useSidebarStore), useState
 * @refactor-suggestions: Agent 패널의 디자인 시스템 동기화 및 훅 명세 최적화 완료.
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSidebarStore } from "@/store/use-sidebar-store";
import GeminiAssistantPanel from "./gemini-assistant-panel";
import GenAiWorkerPanel from "./gen-worker-panel";

export default function AgentPanel() {
  const { rightPanelType, isRightSidebarOpen } = useSidebarStore();

  // [상태/State] 목적: 우측 패널의 현재 너비를 관리함 (기본값: 350px)
  const [width, setWidth] = useState(350);

  // [상태/State] 목적: 사용자의 드래그를 통한 리사이징 활성화 여부
  const [isResizing, setIsResizing] = useState(false);

  // [최적화/Callback] 목적: 리사이징 드래그 시작 시 상태 변경
  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  // [최적화/Callback] 목적: 리사이징 드래그 종료 시 상태 변경
  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  // [최적화/Callback] 목적: 마우스 이동 좌표를 기반으로 300px~700px 범위 내에서 너비 계산
  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        // 우측 끝에서부터의 거리를 계산하여 너비 설정 (GNB 메뉴 폭 52px 제외)
        const newWidth = window.innerWidth - mouseMoveEvent.clientX - 52;
        if (newWidth >= 300 && newWidth <= 700) {
          setWidth(newWidth);
        }
      }
    },
    [isResizing],
  );

  // [효과/Effect] 목적: 전역 마우스 이벤트를 구독하여 리사이징 인터랙션 구현
  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  if (!rightPanelType || !isRightSidebarOpen) return null;

  // [최적화/Render] 패널 타입별 조건부 렌더링
  const renderContent = () => {
    switch (rightPanelType) {
      case "gemini":
        return <GeminiAssistantPanel />;
      case "genai":
        return <GenAiWorkerPanel />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{ width: `${width}px` }}
      className="relative flex h-full flex-col border-l border-white/10 bg-card/80 select-none backdrop-blur-md shadow-2xl"
    >
      {/* Resize Handle (Left side for right panel) */}
      <div
        onMouseDown={startResizing}
        className={`absolute top-0 left-[-2px] w-[4px] h-full cursor-col-resize hover:bg-primary/50 transition-all z-50 ${
          isResizing ? "bg-primary w-[2px]" : ""
        }`}
      />
      {renderContent()}
    </div>
  );
}
