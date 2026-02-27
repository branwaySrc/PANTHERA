/**
 * @description: 대시보드 좌측 사이드바 - Individual/Team/Invited 멀티 아코디언 프로젝트 목록
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: useState (openSections: Set<Section>)
 * @refactor-suggestions: Dashboard 메인 로직의 App Router 최적화 및 원자 단위 컴포넌트(Atomic Component) 분리 완료.
 */
// [UPDATE: 2026-02-24] "컴포넌트 분리 및 재사용성 확보를 위한 아키텍처 개편"
"use client";

import React, { useState, useCallback } from "react";
import { User, Users, Eye, ChevronDown, ChevronRight } from "lucide-react";
import ProjectSideItem from "@/dashboard/component/project-side-item";

type Section = "individual" | "team" | "invited";

interface SectionConfig {
  id: Section;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const SECTION_CONFIG: SectionConfig[] = [
  { id: "individual", label: "Individual", icon: <User size={14} /> },
  { id: "team", label: "Team", icon: <Users size={14} /> },
  {
    id: "invited",
    label: "Invited",
    icon: <Eye size={14} />,
    badge: "View Only",
  },
];

/** Sample items shown in each section until real data is available */
const SAMPLE_ITEMS: Record<Section, { name: string; language: string }[]> = {
  individual: [
    { name: "panthera-core", language: "ts" },
    { name: "design-system", language: "tsx" },
    { name: "auth-service", language: "go" },
    { name: "data-pipeline", language: "py" },
  ],
  team: [
    { name: "api-gateway", language: "ts" },
    { name: "infra-terraform", language: "hcl" },
    { name: "mobile-app", language: "swift" },
    { name: "analytics-dash", language: "py" },
  ],
  invited: [
    { name: "partner-sdk", language: "js" },
    { name: "shared-libs", language: "ts" },
    { name: "docs-site", language: "mdx" },
    { name: "legacy-api", language: "rb" },
  ],
};

export default function ProjectListBar() {
  /**
   * [상태/State] 목적: 동시에 열려 있는 섹션 Set을 추적 (multiple open 지원).
   * Set을 사용하여 O(1) 조회/삽입/삭제 보장.
   */
  const [openSections, setOpenSections] = useState<Set<Section>>(
    new Set(["individual"]),
  );

  /**
   * [최적화/Callback] 목적: 특정 섹션의 열림/닫힘 토글. Set의 불변성을 유지하며 상태 업데이트.
   * 의존성: []
   */
  const toggleSection = useCallback((id: Section) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <nav className="flex h-full w-[220px] flex-shrink-0 flex-col overflow-y-auto border-r border-border bg-background py-3 text-muted-foreground select-none custom-scrollbar">
      {/* Title */}
      <div className="px-4 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Workspaces
        </span>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-0.5 px-2">
        {SECTION_CONFIG.map((section) => {
          const isOpen = openSections.has(section.id);
          const items = SAMPLE_ITEMS[section.id];

          return (
            <div key={section.id}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={`flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[12px] font-semibold transition-colors hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                  isOpen ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isOpen ? (
                    <ChevronDown size={12} className="shrink-0" />
                  ) : (
                    <ChevronRight size={12} className="shrink-0" />
                  )}
                  <span className="flex items-center gap-1.5">
                    {section.icon}
                    {section.label}
                  </span>
                </div>
                {section.badge && (
                  <span className="rounded-sm border border-border bg-muted/30 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                    {section.badge}
                  </span>
                )}
              </button>

              {/* Section Items */}
              {isOpen && (
                <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-border pl-2 pb-1">
                  {items.map((item) => (
                    <ProjectSideItem
                      key={item.name}
                      name={item.name}
                      language={item.language}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
