/**
 * @description: Supabase의 실시간 file_nodes 데이터를 구독하여 프로젝트의 파일 계층 구조를 재귀적으로 렌더링하는 패널
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (useFileStore), useSearchParams
 * @refactor-suggestions: 로컬 데이터에서 Supabase 실시간 DB 기반으로 전환 완료. 추후 가상 스크롤링 도입 검토 필요.
 */
"use client";

import React, { useEffect, useMemo } from "react";
import { MoreHorizontal, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AccordionItem from "./component/accordion-item";
import TreeItem from "./component/tree-item";
import { useFileStore } from "@/store/use-file-store";
import { listToTree, TreeNode } from "@/lib/tree-utils";

export default function ExplorePanel() {
  // [훅 명세]: URL 쿼리 파라미터에서 현재 활성화된 프로젝트 ID를 추출함.
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  // [훅 명세]: Supabase와 연동된 파일 스토어 상태 및 액션 구독.
  const { files, fetchFiles, isLoading } = useFileStore();

  /**
   * [효과/Effect]: 'file_nodes' 테이블에서 특정 프로젝트의 파일 정보를 가져옴.
   * [훅 명세]: 프로젝트 ID가 변경될 때마다 해당 프로젝트의 파일 데이터를 Supabase에서 가져옴.
   * 의존성: [projectId, fetchFiles]
   */
  useEffect(() => {
    if (projectId) {
      fetchFiles(projectId);
    }
  }, [projectId, fetchFiles]);

  /**
   * [최적화/Memo]: Flat한 DB 데이터를 listToTree 유틸을 통해 계층 구조(Tree)로 변환함.
   */
  const fileTree = useMemo(() => {
    return listToTree(files);
  }, [files]);

  /**
   * [재귀 함수]: TreeNode 구조를 바탕으로 TreeItem을 재귀적으로 렌더링함.
   * @param nodes - 렌더링할 트리 노드 배열
   */
  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        id={node.id}
        name={node.name}
        type={node.type}
        defaultOpen={node.type === "folder" ? false : undefined}
      >
        {node.children && node.children.length > 0
          ? renderTree(node.children)
          : null}
      </TreeItem>
    ));
  };

  return (
    <div className="flex h-full w-full flex-col select-none bg-transparent">
      {/* Panel Header */}
      <div className="flex h-10 items-center justify-between px-4 border-b border-border/50">
        <span className="text-[11px] font-semibold tracking-widest text-muted-foreground/80">
          EXPLORER
        </span>
        <button className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-md p-1 transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>

      {/* Accordion Sections */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <AccordionItem title="Panthera" defaultOpen={true}>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground/30" />
            </div>
          ) : fileTree.length > 0 ? (
            <div className="flex flex-col">{renderTree(fileTree)}</div>
          ) : (
            <div className="px-4 py-3 text-[11px] text-muted-foreground italic">
              No files in this project.
            </div>
          )}
        </AccordionItem>

        <AccordionItem title="Outline" defaultOpen={false}>
          <div className="px-4 py-3 text-[11px] text-muted-foreground italic">
            No symbols found in this file.
          </div>
        </AccordionItem>

        <AccordionItem title="Timeline" defaultOpen={false}>
          <div className="px-4 py-3 text-[11px] text-muted-foreground italic">
            No timeline information.
          </div>
        </AccordionItem>
      </div>
    </div>
  );
}
