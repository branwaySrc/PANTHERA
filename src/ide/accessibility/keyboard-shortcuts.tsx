/**
 * [리팩터링 공지]
 * @refactor-log: 2026-02-23 - 단축키 로직을 useKeyboardShortcuts 커스텀 훅으로 분리하고, useSidebarStore 통합에 맞춰 좌/우 사이드바 및 AI 패널 제어 단축키를 추가함.
 * @refactor-suggestions: 1. 단축키 매핑 로직을 별도의 구성 파일(config)로 분리하여 관리 효율성을 높일 수 있습니다. 2. 주요 최적화 훅에 대한 명세 주석 추가 완료.
 */

/**
 * @description: 전역 키보드 단축키를 감지하여 좌/우 사이드바 및 패널 상태를 제어하는 커스텀 훅 및 매니저 컴포넌트
 * @last-updated: 2026-02-23
 * @type: Client
 * @state-management: Zustand (useSidebarStore)
 * @data-source: None
 * @async-logic: useEffect를 사용한 브라우저 keydown 이벤트 리스너 등록
 * @parent-relation: Root Layout 내에서 호출되어 전역 단축키를 관리함
 * @dependencies: useSidebarStore, React (useEffect)
 */

"use client";

import { useEffect } from "react";
import { useSidebarStore, PanelType } from "@/store/use-sidebar-store";

/**
 * @description 전역 키보드 이벤트를 구독하여 사이드바 및 패널 액션을 트리거하는 커스텀 훅
 */
export function useKeyboardShortcuts() {
  const {
    setActivePanel,
    toggleLeftSidebar,
    setRightPanelType,
    toggleRightSidebar,
  } = useSidebarStore();

  // [최적화] 목적: 브라우저 전역 키다운 이벤트를 구독하여 IDE 단축키 로직 실행 / 의존성: 스토어 액션(setActivePanel 등) 갱신 시 리스너 재등록 / 비용: 이벤트 리스너 등록 및 해제 비용 발생
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrl = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;
      const key = event.key.toUpperCase();

      // 1. Sidebar Toggles (Ctrl + Key)
      if (isCtrl && !isShift) {
        if (key === "B") {
          event.preventDefault();
          toggleLeftSidebar();
        } else if (key === "\\") {
          event.preventDefault();
          toggleRightSidebar();
        }
      }

      // 2. Panel Switching (Ctrl + Shift + Key)
      if (isCtrl && isShift) {
        // Left Panels
        let targetLeftPanel: PanelType = null;
        switch (key) {
          case "E":
            targetLeftPanel = "explorer";
            break;
          case "F":
            targetLeftPanel = "search";
            break;
          case "G":
            targetLeftPanel = "git";
            break;
          case "D":
            targetLeftPanel = "debug";
            break;
          case "X":
            targetLeftPanel = "extensions";
            break;
        }

        if (targetLeftPanel) {
          event.preventDefault();
          setActivePanel(targetLeftPanel);
          return;
        }

        // Right AI Panels
        if (key === "G") {
          event.preventDefault();
          setRightPanelType("gemini");
        } else if (key === "J") {
          event.preventDefault();
          setRightPanelType("genai");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    setActivePanel,
    toggleLeftSidebar,
    setRightPanelType,
    toggleRightSidebar,
  ]);
}

/**
 * @description useKeyboardShortcuts 훅을 호출하는 투명 매니저 컴포넌트
 */
export function ShortcutManager() {
  useKeyboardShortcuts();
  return null;
}
