/**
 * @description: 대시보드 메인 영역에 렌더링되는 프로젝트 카드 원자 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: None (Stateless)
 * @refactor-suggestions: Dashboard 메인 로직의 App Router 최적화 및 원자 단위 컴포넌트(Atomic Component) 분리 완료.
 */
// [UPDATE: 2026-02-24] "컴포넌트 분리 및 재사용성 확보를 위한 아키텍처 개편"
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Code2, ExternalLink, Clock } from "lucide-react";
import { Project } from "@/types/database.types";

interface ProjectCardItemProps {
  project: Project;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export default function ProjectCardItem({
  project,
  viewMode,
  onClick,
}: ProjectCardItemProps) {
  // [상태/State] 목적: SVG 이미지 로딩 실패 시 fallback 아이콘으로 전환
  const [imgError, setImgError] = useState(false);

  const logoEl = imgError ? (
    <Code2
      className="text-muted-foreground transition-colors group-hover:text-primary"
      size={18}
    />
  ) : (
    <Image
      src="/logo/PANTHERA_SYMBOL_WHITE.svg"
      alt="project"
      width={18}
      height={18}
      onError={() => setImgError(true)}
      className="opacity-50 transition-opacity group-hover:opacity-90"
    />
  );

  if (viewMode === "list") {
    return (
      <div
        onClick={onClick}
        className="group flex cursor-pointer items-center gap-4 bg-card/20 px-5 py-3 transition-colors hover:bg-white/[0.03]"
      >
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-background/50 transition-colors group-hover:border-primary/30">
          {logoEl}
        </div>
        <div className="flex flex-1 flex-col min-w-0">
          <span className="text-[13px] font-semibold text-foreground truncate transition-colors group-hover:text-primary">
            {project.name}
          </span>
          <span className="text-[11px] text-muted-foreground/70 truncate">
            {project.description ?? "No description."}
          </span>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3 text-[11px] text-muted-foreground/50">
          {project.language && (
            <span className="rounded-full border border-border bg-muted/20 px-2 py-0.5 lowercase">
              {project.language}
            </span>
          )}
          <span>{project.updated_at?.slice(0, 10) ?? "—"}</span>
          <ExternalLink
            size={13}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
      </div>
    );
  }

  // Grid card
  return (
    <div
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col gap-4 rounded-xl border border-border bg-card/20 p-5 shadow-sm transition-all hover:-translate-y-[2px] hover:border-border/80 hover:bg-white/[0.03]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background/50 transition-colors group-hover:border-primary/30">
          {logoEl}
        </div>
        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <ExternalLink size={14} className="text-muted-foreground" />
        </div>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-foreground transition-colors group-hover:text-primary">
          {project.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground/80">
          {project.description ?? "No description."}
        </p>
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
        <div className="flex items-center gap-1.5">
          <Clock size={11} />
          <span>{project.updated_at?.slice(0, 10) ?? "—"}</span>
        </div>
        {project.language && (
          <span className="rounded-full border border-border bg-muted/20 px-2 py-0.5 lowercase">
            {project.language}
          </span>
        )}
      </div>
    </div>
  );
}
