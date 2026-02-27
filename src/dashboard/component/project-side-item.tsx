/**
 * @description: 대시보드 좌측 사이드바 아이템 — 미니멀 아이콘+텍스트 조합의 프로젝트 리스트 아이템
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: None (Stateless)
 * @refactor-suggestions: Dashboard 메인 로직의 App Router 최적화 및 원자 단위 컴포넌트(Atomic Component) 분리 완료.
 */
// [UPDATE: 2026-02-24] "컴포넌트 분리 및 재사용성 확보를 위한 아키텍처 개편"
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";

interface ProjectSideItemProps {
  name: string;
  language?: string;
  onClick?: () => void;
}

export default function ProjectSideItem({
  name,
  language,
  onClick,
}: ProjectSideItemProps) {
  // [상태/State] 목적: SVG 이미지 로딩 실패 시 fallback 아이콘으로 전환
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      {/* Logo icon with SVG fallback */}
      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
        {imgError ? (
          <Code2
            size={14}
            className="text-muted-foreground/60 group-hover:text-foreground/80 transition-colors"
          />
        ) : (
          <Image
            src="/logo/PANTHERA_SYMBOL_WHITE.svg"
            alt="project"
            width={14}
            height={14}
            onError={() => setImgError(true)}
            className="opacity-40 group-hover:opacity-70 transition-opacity"
          />
        )}
      </div>

      {/* Project name */}
      <span className="flex-1 truncate text-[12px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {name}
      </span>

      {/* Language badge */}
      {language && (
        <span className="flex-shrink-0 rounded px-1 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
          {language}
        </span>
      )}
    </button>
  );
}
