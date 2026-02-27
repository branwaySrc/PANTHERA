/**
 * [리팩터링 공지]
 * @refactor-log: 2026-02-23 - use-panel-store의 rightPanelType을 이전하여 좌/우 사이드바 상태를 통합 관리함.
 */

/**
 * @description: 좌측 및 우측 사이드바의 활성 패널 상태와 개폐 여부를 관리하는 통합 Zustand 스토어
 * @last-updated: 2026-02-23
 * @type: Client
 * @state-management: Zustand (useSidebarStore)
 * @data-source: None
 * @async-logic: None
 * @parent-relation: 전역 상태로 사용되며 ActivityBarMenu, AssistantAgentMenu, SidePanel 컨테이너들과 연동됨
 * @dependencies: zustand
 */

import { create } from "zustand";

export type PanelType =
  | "explorer"
  | "search"
  | "git"
  | "debug"
  | "extensions"
  | null;

export type RightPanelType = "gemini" | "genai" | null;

interface SidebarState {
  // 좌측 사이드바
  activePanel: PanelType;
  isLeftSidebarOpen: boolean;
  setActivePanel: (panel: PanelType) => void;
  toggleLeftSidebar: () => void;

  // 우측 사이드바 (AI 어시스턴트)
  rightPanelType: RightPanelType;
  isRightSidebarOpen: boolean;
  setRightPanelType: (type: RightPanelType) => void;
  toggleRightSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  // 좌측 사이드바 초기상태
  activePanel: "explorer",
  isLeftSidebarOpen: true,
  setActivePanel: (panel) =>
    set((state) => {
      if (state.activePanel === panel && state.isLeftSidebarOpen) {
        return { isLeftSidebarOpen: false };
      } else {
        return { activePanel: panel, isLeftSidebarOpen: true };
      }
    }),
  toggleLeftSidebar: () =>
    set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),

  // 우측 사이드바 초기상태
  rightPanelType: "gemini",
  isRightSidebarOpen: true,
  setRightPanelType: (type) =>
    set((state) => {
      if (state.rightPanelType === type && state.isRightSidebarOpen) {
        return { isRightSidebarOpen: false };
      } else {
        return { rightPanelType: type, isRightSidebarOpen: true };
      }
    }),
  toggleRightSidebar: () =>
    set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
}));
