/**
 * @description: 열려 있는 탭을 관리(OpenedContent)하고 고유 경로 ID를 통해 활성 탭의 콘텐츠를 화면 중앙에 렌더링하는 컨테이너
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (usePanelStore)
 * @refactor-suggestions: 디자인 시스템이 Shadcn UI 다크모드로 통일되었습니다.
 */
"use client";

import React from "react";
import { usePanelStore } from "@/store/use-panel-store";
import OpenedContent from "@/ide/navbar/opened-content-tabs";
import ExploreFileContent from "@/ide/panels/main-panel/explore-file-content";

export default function MainPanelContainer() {
  const { activeTabId, openedTabs } = usePanelStore();

  const activeTab = openedTabs.find((t) => t.id === activeTabId);

  if (!activeTab) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background text-muted-foreground">
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold tracking-tight text-foreground">
            Panthera IDE
          </p>
          <p className="text-sm">파일을 선택하여 편집을 시작하세요.</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab.type) {
      case "file":
        return <ExploreFileContent name={activeTab.title} id={activeTab.id} />;
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-1 flex-col overflow-hidden bg-background text-foreground">
      <OpenedContent />
      <div className="flex-1 overflow-auto custom-scrollbar">
        {renderContent()}
      </div>
    </main>
  );
}
