/**
 * @description: 메인 엔트리 포인트 (인증 페이지)
 * @last-updated: 2026-02-24
 * @type: Client
 * @refactor-suggestions: 인증 -> 대시보드 -> IDE 연쇄 라우팅 구현 완료.
 */
"use client";

import LoginPage from "@/auth/login-page";

export default function AuthPage() {
  return <LoginPage />;
}
