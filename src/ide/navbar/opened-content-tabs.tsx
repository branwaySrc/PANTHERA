/**
 * @description: 열려 있는 탭 목록을 가로로 표시하며, 가로 휠 스크롤 및 네이티브 Drag & Drop 순서 변경 기능이 적용된 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (usePanelStore)
 * @refactor-suggestions: 보더 명암비 최적화(50% 하향) 및 인터랙션 피드백 복원 완료.
 */
"use client";

import React, { useCallback, useRef, memo, useState } from "react";
import { X } from "lucide-react";
import { usePanelStore, TabItem } from "@/store/use-panel-store";

/**
 * @description 개별 탭 항목을 렌더링하며 드래그 앤 드롭 이벤트를 처리함
 */
const TabItemComponent = memo(
  ({
    tab,
    index,
    isActive,
    isDragging,
    isDragOver,
    onSelect,
    onRemove,
    onDragStart,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDragEnd,
    onDrop,
  }: {
    tab: TabItem;
    index: number;
    isActive: boolean;
    isDragging: boolean;
    isDragOver: boolean;
    onSelect: (id: string) => void;
    onRemove: (id: string) => void;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragEnter: (e: React.DragEvent, index: number) => void;
    onDragLeave: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
    onDrop: (e: React.DragEvent, index: number) => void;
  }) => {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={(e) => onDragOver(e, index)}
        onDragEnter={(e) => onDragEnter(e, index)}
        onDragLeave={(e) => onDragLeave(e, index)}
        onDragEnd={onDragEnd}
        onDrop={(e) => onDrop(e, index)}
        onClick={() => onSelect(tab.id)}
        className={`group relative flex h-full min-w-[120px] max-w-[200px] cursor-pointer items-center justify-between border-r border-border px-3 text-[13px] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
          isActive
            ? "bg-background text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
            : "bg-muted/10 text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground"
        } ${isDragging ? "opacity-40 grayscale-[0.5]" : "opacity-100"}`}
      >
        {/* Active Tab Top Indicator */}
        {isActive && (
          <div className="absolute top-0 left-0 h-[2px] w-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.6)]" />
        )}

        <span
          className={`truncate pr-4 pointer-events-none transition-colors ${isActive ? "font-semibold" : "font-medium"}`}
        >
          {tab.title}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tab.id);
          }}
          className={`flex h-4 w-4 items-center justify-center rounded-sm transition-all hover:bg-destructive/20 hover:text-destructive ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <X size={12} />
        </button>

        {/* Drop Indicator (Visual line on the right side if dragged over) */}
        {isDragOver && (
          <div className="absolute inset-y-0 right-[-1px] z-50 w-[2px] bg-primary" />
        )}
      </div>
    );
  },
);

TabItemComponent.displayName = "TabItemComponent";

export default function OpenedContent() {
  const { openedTabs, activeTabId, setActiveTab, removeTab, reorderTabs } =
    usePanelStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // [훅 명세]: 드래그 앤 드롭 중인 탭의 인덱스와 드롭 대상 인덱스를 관리함.
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // [훅 명세]: 마우스 휠 입력을 가로 스크롤로 변환하여 탭 탐색 편의성을 제공함.
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();
      if (draggedIndex === null || draggedIndex === targetIndex) {
        setDraggedIndex(null);
        setDragOverIndex(null);
        return;
      }

      reorderTabs(draggedIndex, targetIndex);
      setDraggedIndex(null);
      setDragOverIndex(null);
    },
    [draggedIndex, reorderTabs],
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  if (openedTabs.length === 0) return null;

  return (
    <div
      ref={scrollContainerRef}
      onWheel={handleWheel}
      className="flex h-12 w-full overflow-x-auto overflow-y-hidden border-b border-border bg-card/30 select-none custom-scrollbar"
      onDragLeave={() => setDragOverIndex(null)}
    >
      {openedTabs.map((tab, index) => (
        <TabItemComponent
          key={tab.id}
          tab={tab}
          index={index}
          isActive={activeTabId === tab.id}
          isDragging={draggedIndex === index}
          isDragOver={dragOverIndex === index}
          onSelect={setActiveTab}
          onRemove={removeTab}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
