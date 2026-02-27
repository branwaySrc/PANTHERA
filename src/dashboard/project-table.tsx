/**
 * @description: 프로젝트 카드 목록을 표시하는 대시보드 메인 콘텐츠 영역 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: useState (searchQuery, viewMode)
 * @refactor-suggestions: Dashboard 메인 로직의 App Router 최적화 및 원자 단위 컴포넌트(Atomic Component) 분리 완료.
 */
// [UPDATE: 2026-02-24] "컴포넌트 분리 및 재사용성 확보를 위한 아키텍처 개편"
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Plus, LayoutGrid, List, Search, FolderOpen } from "lucide-react";
import { Project } from "@/types/database.types";
import ProjectCardItem from "@/dashboard/component/project-card-item";

interface ProjectTableProps {
  projects: Project[];
  isLoading: boolean;
  onOpen: (id: string) => void;
}

export default function ProjectTable({
  projects,
  isLoading,
  onOpen,
}: ProjectTableProps) {
  // [상태/State] 목적: 검색창 입력값을 추적하여 프로젝트 목록 필터링에 사용
  const [searchQuery, setSearchQuery] = useState("");

  // [상태/State] 목적: 그리드/리스트 뷰 모드 전환을 추적
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  /**
   * [최적화/Memo] 목적: searchQuery가 변경될 때만 필터링된 프로젝트 목록을 재계산.
   * 의존성: [projects, searchQuery]
   */
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description ?? "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    [projects, searchQuery],
  );

  /**
   * [최적화/Callback] 목적: 프로젝트 카드 클릭 핸들러. onOpen prop을 메모화하여 불필요한 재생성 방지.
   * 의존성: [onOpen]
   */
  const handleOpen = useCallback(
    (id: string) => {
      onOpen(id);
    },
    [onOpen],
  );

  return (
    <main className="flex flex-1 flex-col overflow-y-auto custom-scrollbar">
      <div className="mx-auto w-full max-w-[1100px] space-y-6 p-8">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[22px] font-bold tracking-tight text-foreground">
              Your Projects
            </h2>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Manage and launch your IDE workspaces
            </p>
          </div>
          <button className="flex items-center gap-2 h-9 rounded-md bg-primary px-4 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]">
            <Plus size={16} />
            New Project
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative max-w-[360px] flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40"
              size={14}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-md border border-border bg-card/20 pl-9 pr-4 text-[13px] text-foreground outline-none placeholder:text-muted-foreground/40 transition-all focus:border-primary/50 focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="flex items-center rounded-md border border-border bg-card/20 p-1">
            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className={`rounded-sm p-1.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-accent/20 text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="List view"
              className={`rounded-sm p-1.5 transition-colors ${
                viewMode === "list"
                  ? "bg-accent/20 text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-[13px] text-muted-foreground animate-pulse">
              Loading projects...
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 rounded-xl border border-dashed border-border bg-card/10">
            <FolderOpen size={36} className="text-muted-foreground/30" />
            <p className="text-[13px] text-muted-foreground">
              {searchQuery
                ? `No projects match "${searchQuery}"`
                : "No projects yet. Create your first one!"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                viewMode="grid"
                onClick={() => handleOpen(project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border rounded-xl border border-border overflow-hidden">
            {filteredProjects.map((project) => (
              <ProjectCardItem
                key={project.id}
                project={project}
                viewMode="list"
                onClick={() => handleOpen(project.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
