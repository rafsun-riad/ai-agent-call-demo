import ClientOnly from "@/components/client-only";
import LoginPageContent from "@/components/login-page-content";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <ClientOnly fallback={<div className="min-h-screen bg-slate-50" />}>
      <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
        <LoginPageContent />
      </Suspense>
    </ClientOnly>
  );
}
