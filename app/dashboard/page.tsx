"use client";

import { useRouter } from "next/navigation";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  if (isChecking) return null;

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  return (
    <div
      className={`${display.variable} ${body.variable} flex min-h-screen items-center justify-center bg-[#F4F7F6] text-[#0F1F1C] [font-family:var(--font-body)] p-6 sm:p-12`}
    >
      <div className="w-full max-w-lg">
        <div className="w-full">
          <header className="space-y-3 px-0 pb-10">
            <h1 className="text-4xl font-semibold tracking-tight text-[#0F1F1C] [font-family:var(--font-display)]">
              Dashboard
            </h1>
            <p className="text-base text-[#5B6B67]">
              Welcome back! You are successfully logged in.
            </p>
          </header>

          <div className="space-y-6 px-0">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="px-0 pb-3">
                <CardTitle className="text-xl font-semibold text-[#0F1F1C] [font-family:var(--font-display)]">
                  Session Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 text-base text-[#5B6B67] space-y-4">
                <p>
                  Your active JWT session is securely stored in LocalStorage.
                </p>
              </CardContent>
            </Card>

            <div className="pt-10">
              <Button
                onClick={handleLogout}
                className="h-12 w-full rounded-lg bg-[#17463C] text-base font-medium text-white hover:bg-[#0F3129] focus-visible:ring-[#2E8B73]/40"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}