/**
 * @description: Supabase DB 스키마와 100% 동기화된 TypeScript 타입 정의
 * @last-updated: 2026-02-24
 * @source: src/db/schema-definition.md
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          language: string | null;
          owner_id: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          language?: string | null;
          owner_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          language?: string | null;
          owner_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      file_nodes: {
        Row: {
          id: string;
          name: string;
          type: "file" | "folder";
          content: string | null;
          parent_id: string | null;
          project_id: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          type: "file" | "folder";
          content?: string | null;
          parent_id?: string | null;
          project_id: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          type?: "file" | "folder";
          content?: string | null;
          parent_id?: string | null;
          project_id?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// 편리한 접근을 위한 헬퍼 타입
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type FileNode = Database["public"]["Tables"]["file_nodes"]["Row"];
