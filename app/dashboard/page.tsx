/**
 * @description: 대시보드 최상위 App Router 페이지. 데이터 페칭 및 레이아웃 조합 담당.
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: useState (projects, isLoading)
 * @source-of-truth: src/db/schema-definition.md
 * @refactor-suggestions: Dashboard 메인 로직의 App Router 최적화 및 원자 단위 컴포넌트(Atomic Component) 분리 완료.
 */
// [UPDATE: 2026-02-24] "컴포넌트 분리 및 재사용성 확보를 위한 아키텍처 개편"
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { Project } from "@/types/database.types";
import TopHeaderNav from "@/dashboard/navbar/top-header-nav";
import ProjectListBar from "@/dashboard/navbar/project-list-bar";
import ProjectTable from "@/dashboard/project-table";

export default function DashboardPage() {
  // [상태/State] 목적: Supabase에서 페칭한 실제 프로젝트 리스트 데이터 관리
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // [훅 명세]: 특정 프로젝트 선택 시 IDE 경로로 이동하기 위한 라우터 인스턴스
  const router = useRouter();

  /**
   * [효과/Effect]: 'projects' 테이블에서 현재 사용자의 프로젝트 목록을 가져옴.
   * [훅 명세]: 컴포넌트 마운트 시 Supabase 'projects' 테이블에서 데이터 로드.
   * 의존성: [] (Initial Mount Only)
   */
  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  /**
   * [최적화/Callback] 목적: 프로젝트 클릭 시 해당 프로젝트 ID를 가지고 IDE 경로('/ide')로 이동.
   * 의존성: [router]
   */
  const handleOpenProject = useCallback(
    (projectId: string) => {
      router.push(`/ide?project=${projectId}`);
    },
    [router],
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Top Navigation */}
      <TopHeaderNav />

      {/* Main layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <ProjectListBar />

        {/* Main content area */}
        <ProjectTable
          projects={projects}
          isLoading={isLoading}
          onOpen={handleOpenProject}
        />
      </div>
    </div>
  );
}
