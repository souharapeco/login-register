"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setTokens(data.accessToken, data.refreshToken);
      router.push(CONFIG.ROUTES.DASHBOARD);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${display.variable} ${body.variable} grid min-h-screen bg-[#F4F7F6] text-[#0F1F1C] [font-family:var(--font-body)] lg:grid-cols-2`}
    >
      <aside className="relative hidden overflow-hidden bg-[#17463C] lg:block">
        <Image
          src="/j.jpg"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0B2A23]/70 via-[#0B2A23]/10 to-[#0B2A23]/20"
        />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div className="max-w-md space-y-3">
          </div>
        </div>
      </aside>

      <main className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-lg">
          <span className="mb-12 block text-sm font-semibold tracking-tight [font-family:var(--font-display)] lg:hidden">
            Your App
          </span>
          <div className="w-full">
            <CardHeader className="space-y-3 px-0 pb-10">
              <CardTitle className="text-4xl font-semibold tracking-tight text-[#0F1F1C] [font-family:var(--font-display)]">
                Login
              </CardTitle>
              <CardDescription className="text-base text-[#5B6B67]">
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-6 px-0">
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg border border-[#B42318]/30 bg-[#B42318]/5 px-3 py-2 text-sm text-[#B42318]"
                  >
                    {error}
                  </p>
                )}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[#0F1F1C]">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    className="h-12 rounded-lg border-[#D5DEDB] bg-white text-base shadow-none focus-visible:border-[#2E8B73] focus-visible:ring-[#2E8B73]/25"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#0F1F1C]">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="h-12 rounded-lg border-[#D5DEDB] bg-white text-base shadow-none focus-visible:border-[#2E8B73] focus-visible:ring-[#2E8B73]/25"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-8 border-0 bg-transparent px-0 pt-10">
                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[#17463C] text-base font-medium text-white hover:bg-[#0F3129] focus-visible:ring-[#2E8B73]/40"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <p className="text-sm text-[#5B6B67]">
                  Don't have an account?{" "}
                  <Link
                    href={CONFIG.ROUTES.REGISTER}
                    className="font-medium text-[#17463C] underline-offset-4 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </CardFooter>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}