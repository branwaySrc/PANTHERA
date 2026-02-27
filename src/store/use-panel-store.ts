/**
 * [리팩터링 공지]
 * @refactor-log: 2026-02-23 - 우측 AI 패널 상태(`rightPanelType`)를 `useSidebarStore`로 이전하여 관리 효율성을 높임.
 */

/**
 * @description: 패널의 활성 ID, 탭 목록 및 활성 탭 상태(고유 경로 ID 및 순서 관리 지원)를 관리하는 Zustand 스토어
 * @last-updated: 2026-02-23
 * @type: Client
 * @state-management: Zustand (usePanelStore)
 * @data-source: None
 * @async-logic: None
 * @parent-relation: 전역 상태로 사용되며 TreeItem, OpenedContent, MainPanelContainer와 직접 연동됨
 * @dependencies: zustand
 */

import { create } from "zustand";

export interface TabItem {
  id: string; // 고유 경로 (Unique Path ID)
  title: string;
  type: string;
}

interface PanelState {
  activePanelId: string | null;
  panelData: Record<string, unknown> | null;
  openedTabs: TabItem[];
  activeTabId: string | null; // 현재 활성화된 탭의 고유 경로 ID
  setActivePanel: (
    id: string | null,
    data?: Record<string, unknown> | null,
  ) => void;
  addTab: (tab: TabItem) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  reorderTabs: (startIndex: number, endIndex: number) => void;
}

export const usePanelStore = create<PanelState>((set) => ({
  activePanelId: null,
  panelData: null,
  openedTabs: [],
  activeTabId: null,

  setActivePanel: (id, data = null) =>
    set({ activePanelId: id, panelData: data }),

  addTab: (tab) =>
    set((state) => {
      const exists = state.openedTabs.some((t) => t.id === tab.id);
      if (exists) {
        return { activeTabId: tab.id };
      }
      return {
        openedTabs: [...state.openedTabs, tab],
        activeTabId: tab.id,
      };
    }),

  removeTab: (id) =>
    set((state) => {
      const newTabs = state.openedTabs.filter((t) => t.id !== id);
      let newActiveId = state.activeTabId;

      if (state.activeTabId === id) {
        if (newTabs.length > 0) {
          const index = state.openedTabs.findIndex((t) => t.id === id);
          const nextTab = newTabs[index] || newTabs[index - 1];
          newActiveId = nextTab.id;
        } else {
          newActiveId = null;
        }
      }

      return {
        openedTabs: newTabs,
        activeTabId: newActiveId,
      };
    }),

  setActiveTab: (id) => set({ activeTabId: id }),

  reorderTabs: (startIndex, endIndex) =>
    set((state) => {
      const newTabs = Array.from(state.openedTabs);
      const [removed] = newTabs.splice(startIndex, 1);
      newTabs.splice(endIndex, 0, removed);
      return { openedTabs: newTabs };
    }),
}));
