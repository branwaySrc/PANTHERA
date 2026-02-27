/**
 * @description: 선택된 활성 패널(Explorer, Search 등)에 따라 적절한 패널 콘텐츠를 렌더링하고 너비 조절 기능을 제공하는 컨테이너.
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (useSidebarStore)
 * @refactor-suggestions: 디자인 시스템이 Shadcn UI 다크모드로 통일되었습니다.
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSidebarStore } from "@/store/use-sidebar-store";
import ExplorePanel from "./explore-panel";
import SearchPanel from "./search-panel";
import SourceControlPanel from "./source-control-panel";

export default function StructurePanel() {
  const { activePanel, isLeftSidebarOpen: isOpen } = useSidebarStore();
  const [width, setWidth] = useState(260);
  const [isResizing, setIsResizing] = useState(false);

  // [참조] 목적: 좌측 패널 리사이징 드래그 상태 관리
  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  // [최적화] 목적: 마우스 이동 좌표를 기반으로 사이드바 너비 계산 및 반영
  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        // Activity Bar Width 52px 조정
        const newWidth = mouseMoveEvent.clientX - 52;
        if (newWidth >= 100) {
          setWidth(newWidth);
        }
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  if (!isOpen) return null;

  const renderPanel = () => {
    switch (activePanel) {
      case "explorer":
        return <ExplorePanel />;
      case "search":
        return <SearchPanel />;
      case "git":
        return <SourceControlPanel />;
      case "debug":
        return (
          <div className="p-4 text-[13px] text-muted-foreground italic">
            Run and Debug
          </div>
        );
      case "extensions":
        return (
          <div className="p-4 text-[13px] text-muted-foreground italic">
            Extensions
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{ width: `${width}px`, maxWidth: "500px" }}
      className="relative flex h-full flex-col border-r border-border bg-card/50 select-none backdrop-blur-sm"
    >
      {renderPanel()}
      {/* Resize Handle */}
      <div
        onMouseDown={startResizing}
        className={`absolute top-0 right-[-2px] w-[4px] h-full cursor-col-resize hover:bg-primary/50 transition-all z-50 ${
          isResizing ? "bg-primary w-[2px]" : ""
        }`}
      />
    </div>
  );
}
