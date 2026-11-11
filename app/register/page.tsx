"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      router.push(CONFIG.ROUTES.LOGIN);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${display.variable} ${body.variable} flex min-h-screen items-center justify-center bg-[#F4F7F6] text-[#0F1F1C] [font-family:var(--font-body)] p-6 sm:p-12`}
    >
      <div className="w-full max-w-lg">
        <div className="w-full">
          <CardHeader className="space-y-3 px-0 pb-10">
            <CardTitle className="text-4xl font-semibold tracking-tight text-[#0F1F1C] [font-family:var(--font-display)]">
              Create Account
            </CardTitle>
            <CardDescription className="text-base text-[#5B6B67]">
              Register a new account to get started.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleRegister}>
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
                {loading ? "Registering..." : "Register"}
              </Button>
              <p className="text-sm text-[#5B6B67]">
                Already have an account?{" "}
                <Link
                  href={CONFIG.ROUTES.LOGIN}
                  className="font-medium text-[#17463C] underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </div>
      </div>
    </div>
  );
}