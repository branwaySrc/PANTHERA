/**
 * @description: 사이드바의 활성 패널을 선택하고 전환하는 좌측 액티비티 바 메뉴 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (useSidebarStore)
 * @refactor-suggestions: 보더 명압비 최적화(50% 하향) 및 인터랙션 피드백 복원 완료.
 */
"use client";

import React from "react";
import {
  Files,
  Search,
  GitBranch,
  Play,
  SquareLibrary,
  UserCircle,
  Settings,
} from "lucide-react";
import { useSidebarStore, PanelType } from "@/store/use-sidebar-store";

type ActivityItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

export default function ActivityBarMenu() {
  const {
    activePanel,
    setActivePanel,
    isLeftSidebarOpen: isOpen,
  } = useSidebarStore();

  const topIconItems: (ActivityItem & { id: PanelType })[] = [
    {
      id: "explorer",
      label: "Explorer",
      icon: <Files size={24} />,
    },
    {
      id: "search",
      label: "Search",
      icon: <Search size={24} />,
    },
    {
      id: "git",
      label: "Source Control",
      icon: <GitBranch size={24} />,
    },
    {
      id: "debug",
      label: "Run and Debug",
      icon: <Play size={24} />,
    },
    {
      id: "extensions",
      label: "Extensions",
      icon: <SquareLibrary size={24} />,
    },
  ];

  const bottomIconItems: ActivityItem[] = [
    {
      id: "account",
      label: "Account",
      icon: <UserCircle size={24} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={24} />,
    },
  ];

  return (
    <nav className="flex h-full w-[52px] flex-col items-center bg-background border-r border-border py-4 text-muted-foreground select-none">
      {/* Top section */}
      <div className="flex w-full flex-col items-center gap-2">
        {topIconItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePanel(item.id)}
            title={item.label}
            className={`relative flex h-[48px] w-[48px] items-center justify-center transition-all rounded-md mx-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
              activePanel === item.id && isOpen
                ? "text-primary bg-accent/20 shadow-sm"
                : "hover:bg-accent/10"
            }`}
          >
            <div className="flex items-center justify-center transition-all active:scale-90 group-hover:scale-110">
              {item.icon}
            </div>
            {activePanel === item.id && isOpen && (
              <div className="absolute left-[-1px] h-[24px] w-[2px] bg-primary rounded-r-full shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
            )}
          </button>
        ))}
      </div>
      {/* Bottom section */}
      <div className="mt-auto flex w-full flex-col items-center gap-2">
        {bottomIconItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            className="relative flex h-12 w-12 items-center justify-center transition-all hover:text-foreground hover:bg-accent/10 rounded-md mx-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <div className="flex items-center justify-center active:scale-95">
              {item.icon}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
}
