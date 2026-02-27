import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

// Supabase 환경 변수 로드 (Next.js 표준 public prefix 준수)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://nroqcfpjxgkkegnboqcv.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yb3FjZnBqeGdra2VnbmJvcWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NzIyNDIsImV4cCI6MjA4NzQ0ODI0Mn0.zWoTIZZDl2EbZ4inuVBhbzQk98qhgECua2lPf-fsZiM";

/**
 * [훅 명세]: Supabase 클라이언트 인스턴스.
 * Database 제네릭 타입을 적용하여 모든 쿼리에 타입 시스템을 강제함.
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
