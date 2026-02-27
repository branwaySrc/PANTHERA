/**
 * @description: 사용자 인증을 위한 로그인 페이지 컴포넌트
 * @last-updated: 2026-02-24
 * @type: Client
 * @state-management: useState (email, password)
 * @refactor-suggestions: 인증 -> 대시보드 -> IDE 연쇄 라우팅 구현 완료. 추후 실제 Auth API 연동 필요.
 */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogIn, Github, Mail } from "lucide-react";

export default function LoginPage() {
  // [훅 명세]: 페이지 전환을 위한 Next.js 라우터 인스턴스 초기화
  const router = useRouter();

  // [상태/State] 목적: 로그인을 위한 이메일 입력값 관리
  const [email, setEmail] = useState("");
  // [상태/State] 목적: 로그인을 위한 비밀번호 입력값 관리
  const [password, setPassword] = useState("");

  // [최적화/Callback] 목적: 로그인 버튼 클릭 시 대시보드로 임시 리다이렉션 수행
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-[#fafafa] select-none p-4">
      <div className="w-full max-w-[400px] space-y-8 rounded-xl border border-white/10 bg-card/30 p-8 shadow-2xl backdrop-blur-md">
        {/* Branding Area */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-background/50 p-2 shadow-inner">
            <Image
              src="/logo/ROUNDED_SYMBOL_DARK.svg"
              alt="Panthera Logo"
              fill
              unoptimized
              className="object-contain p-2"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome to Panthera
            </h1>
            <p className="mt-1 text-[13px] text-muted-foreground/80">
              The AI-powered Content IDE
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-10 rounded-md border border-white/10 bg-background/50 px-3 text-[13px] outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-10 rounded-md border border-white/10 bg-background/50 px-3 text-[13px] outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/30"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 h-10 rounded-md bg-primary text-[14px] font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] mt-6"
          >
            <LogIn size={16} />
            Sign In with Panthera
          </button>
        </form>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-[#09090b] px-3 text-muted-foreground/50">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 h-10 rounded-md border border-white/10 bg-background/50 text-[13px] font-medium transition-all hover:bg-white/5 active:scale-[0.98]">
            <Github size={16} />
            GitHub
          </button>
          <button className="flex items-center justify-center gap-2 h-10 rounded-md border border-white/10 bg-background/50 text-[13px] font-medium transition-all hover:bg-white/5 active:scale-[0.98]">
            <Mail size={16} />
            Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[12px] text-muted-foreground/60 pt-4">
          Don&apos;t have an account?{" "}
          <span className="text-primary hover:underline cursor-pointer font-medium">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
