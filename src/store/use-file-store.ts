/**
 * @description: Supabase DB 스키마와 동기화되어 프로젝트의 파일 트리 데이터를 관리하는 Zustand 스토어
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: Zustand (useFileStore)
 * @source-of-truth: src/db/schema-definition.md
 * @refactor-suggestions: Supabase 스키마 동기화 프로세스 도입 완료. src/db/schema-definition.md를 설계의 원천으로 사용함.
 */
import { create } from "zustand";
import { supabase } from "@/lib/supabase-client";
import { Database, FileNode } from "@/types/database.types";

export type ItemType = "file" | "folder";

interface SelectedItem {
  id: string;
  name: string;
  type: ItemType;
}

interface FileState {
  // 상태 (State)
  files: FileNode[];
  selectedItem: SelectedItem | null;
  isLoading: boolean;

  // 액션 (Actions)
  setSelectedItem: (item: SelectedItem | null) => void;

  /**
   * [훅 명세]: 특정 프로젝트의 모든 파일 노드를 Supabase에서 가져옴.
   * @param projectId - 현재 활성화된 프로젝트 ID
   */
  fetchFiles: (projectId: string) => Promise<void>;

  /**
   * [훅 명세]: 파일이나 폴더 정보를 DB에 추가하거나 업데이트(Upsert)함.
   * @param node - 업데이트할 파일 노드 정보 (Insert 타입 기반)
   */
  upsertFile: (
    node: Database["public"]["Tables"]["file_nodes"]["Insert"],
  ) => Promise<void>;

  /**
   * [훅 명세]: 특정 파일/폴더를 삭제함.
   * @param id - 삭제할 노드 ID
   */
  deleteFile: (id: string) => Promise<void>;
}

export const useFileStore = create<FileState>((set, get) => ({
  files: [],
  selectedItem: null,
  isLoading: false,

  setSelectedItem: (item) => set({ selectedItem: item }),

  fetchFiles: async (projectId: string) => {
    /** [효과/Effect]: 'file_nodes' 테이블에서 특정 프로젝트의 모든 파일 노드를 조회함. */
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("file_nodes")
        .select("*")
        .eq("project_id", projectId)
        .order("name", { ascending: true });

      if (error) throw error;
      set({ files: data || [] });
    } catch (err) {
      console.error("Failed to fetch files:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  upsertFile: async (
    node: Database["public"]["Tables"]["file_nodes"]["Insert"],
  ) => {
    /** [효과/Effect]: 'file_nodes' 테이블에 파일 정보를 추가하거나 업데이트함. */
    try {
      // Supabase SDK의 타입 추론 이슈로 인해 명시적인 타입 단언 사용
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await supabase.from("file_nodes").upsert(node as any);

      if (error) throw error;

      // 로컬 상태 동기화 (최적화: 재페칭 대신 상태 업데이트 가능)
      if (node.project_id) {
        get().fetchFiles(node.project_id);
      }
    } catch (err) {
      console.error("Failed to upsert file:", err);
    }
  },

  deleteFile: async (id: string) => {
    /** [효과/Effect]: 'file_nodes' 테이블에서 특정 파일을 삭제함. */
    try {
      const { error } = await supabase.from("file_nodes").delete().eq("id", id);

      if (error) throw error;

      set((state) => ({
        files: state.files.filter((f) => f.id !== id),
        selectedItem: state.selectedItem?.id === id ? null : state.selectedItem,
      }));
    } catch (err) {
      console.error("Failed to delete file:", err);
    }
  },
}));
