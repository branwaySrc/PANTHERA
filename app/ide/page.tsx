/**
 * @description: IDE 메인 레이아웃 및 컴포넌트 구성을 담당하는 페이지 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (Store 초기화 및 하위 컴포넌트 주입)
 * @refactor-suggestions: 인증 -> 대시보드 -> IDE 연쇄 라우팅 구현 완료.
 */
"use client";

import React from "react";
import ActivityBarMenu from "@/ide/navbar/activity-bar-menu";
import TopProjectHeader from "@/ide/navbar/top-project-header";
import StructurePanel from "@/ide/panels/structure-panel";
import { ShortcutManager } from "@/ide/accessibility/keyboard-shortcuts";
import MainPanelContainer from "@/ide/panels/main-panel/main-panel-container";
import AgentPanel from "@/ide/panels/agent-panel";
import AssistantAgentMenu from "@/ide/navbar/assistant-agent-menu";

export default function IdePage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <ShortcutManager />
      <TopProjectHeader />
      <div className="flex flex-1 overflow-hidden">
        <ActivityBarMenu />
        <StructurePanel />
        <MainPanelContainer />
        <AgentPanel />
        <AssistantAgentMenu />
      </div>
    </div>
  );
}
