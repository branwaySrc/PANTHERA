/**
 * @description: 파일 트리 구조에서 폴더 및 파일 항목을 렌더링하며 고유 경로 ID를 기반으로 활성 상태 및 탭을 관리함
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (usePanelStore), useState
 * @refactor-suggestions: 보더 명암비 최적화(50% 하향) 및 인터랙션 피드백 복원 완료.
 */
"use client";

import React, { useState, createContext, useContext, useMemo } from "react";
import { ChevronRight, Folder, File, FolderOpen } from "lucide-react";
import { usePanelStore } from "@/store/use-panel-store";

const TreeDepthContext = createContext(0);

interface TreeItemProps {
  id: string; // 고유한 파일 경로 또는 식별자
  name: string; // 표시될 이름
  type: "folder" | "file";
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export default function TreeItem({
  id,
  name,
  type,
  children,
  defaultOpen = false,
}: TreeItemProps) {
  const depth = useContext(TreeDepthContext);
  const { addTab, activeTabId } = usePanelStore();

  // [훅 명세]: 트리 아이템의 확장/축소 상태를 제어함.
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasChildren = type === "folder" && !!children;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === "folder" && hasChildren) {
      setIsOpen(!isOpen);
    } else if (type === "file") {
      addTab({ id, title: name, type });
    }
  };

  // 하이라이트 조건: 오직 파일 타입이면서 고유 ID(activeTabId)와 일치할 때만 적용
  const isActive = type === "file" && activeTabId === id;

  // [훅 명세]: depth 기반의 수직 가이드라인 배열을 메모이제이션하여 불필요한 계산을 방지함.
  const indentLines = useMemo(() => {
    return Array.from({ length: depth }, (_, i) => i);
  }, [depth]);

  return (
    <div className="flex flex-col">
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className={`group relative flex h-7 cursor-pointer items-center gap-1.5 pr-2 text-[13px] transition-all rounded-sm mx-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
          isActive
            ? "bg-accent/20 text-accent-foreground font-medium shadow-sm"
            : "text-muted-foreground/80 hover:bg-accent/10 hover:text-foreground"
        }`}
      >
        {/* Vertical Indent Guides */}
        {indentLines.map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-[1px] bg-border/20 transition-colors group-hover:bg-border/40"
            style={{ left: `${i * 16 + 12}px` }}
          />
        ))}

        {/* Chevron Icon with Animation */}
        <div className="flex w-4 items-center justify-center">
          {hasChildren ? (
            <ChevronRight
              size={14}
              className={`text-muted-foreground transition-all duration-200 group-hover:text-foreground ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          ) : null}
        </div>

        <span className="flex items-center gap-2">
          {type === "folder" ? (
            isOpen ? (
              <FolderOpen
                size={16}
                className="text-amber-400/70 transition-opacity group-hover:opacity-100 opacity-80"
              />
            ) : (
              <Folder
                size={16}
                className="text-amber-400/70 transition-opacity group-hover:opacity-100 opacity-80"
              />
            )
          ) : (
            <File
              size={16}
              className={`transition-all duration-200 ${
                isActive
                  ? "text-primary opacity-100"
                  : "text-muted-foreground/40 group-hover:text-muted-foreground/80 group-hover:opacity-100"
              }`}
            />
          )}
          <span
            className={`truncate transition-colors ${isActive ? "text-foreground" : "group-hover:text-foreground"}`}
          >
            {name}
          </span>
        </span>
      </div>

      {isOpen && hasChildren && (
        <TreeDepthContext.Provider value={depth + 1}>
          <div className="flex flex-col">{children}</div>
        </TreeDepthContext.Provider>
      )}
    </div>
  );
}
