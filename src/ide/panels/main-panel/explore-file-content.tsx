/**
 * [리팩토리 가능한 영역]
 * @refactor-suggestions: 고유 경로 ID(id)를 수신하여 실제 파일의 코드를 서버나 로컬 저장소에서 불러오는 로직을 추가할 수 있습니다. Monaco Editor와 같은 코드 에디터 라이브러리와 연동하여 실제 편집 기능을 구현하는 단계로 확장 가능합니다.
 */

/**
 * @description: 탐색기에서 선택된 개별 파일의 상세 내용이나 편집기를 표시하는 컴포넌트 (고유 ID 지원)
 * @last-updated: 2026-02-23
 * @type: Client
 * @state-management: props를 통해 파일 이름(name)과 고유 ID(id)를 전달받음
 * @data-source: None
 * @async-logic: None
 * @parent-relation: MainPanelContainer 내부에 렌더링됨
 * @dependencies: React
 */
"use client";

import React from "react";

interface ExploreFileContentProps {
  name: string;
  id: string;
}

export default function ExploreFileContent({
  name,
  id,
}: ExploreFileContentProps) {
  return (
    <div className="flex h-full flex-col p-6">
      <h1 className="mb-2 text-2xl font-bold">{name}</h1>
      <p className="mb-4 text-xs text-[#858585]">{id}</p>
      <p className="text-[#cccccc]">
        이 파일의 내용을 여기에 표시하거나 편집기를 로드합니다.
      </p>
    </div>
  );
}
