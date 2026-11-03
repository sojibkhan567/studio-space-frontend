"use client"

import Link from "next/link"
import { Mail, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AuthCard,
  GoogleButton,
  Divider,
  IconInput,
  PasswordInput,
  submitClass,
} from "@/components/common/AuthShared"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"

export default function LoginPage() {
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >
    //console.log("login", { ...data, remember })
    setLoading(true)

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      })

      if (authError) {
        toast.error(authError.message || "Sign in failed.", {
          style: {
            borderRadius: "5px",
            background: "#FDEBE8",
            color: "red",
          },
        })
        return
      }

      if (data) {
        router.replace(redirectTo)
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to book a studio or manage your listings."
      footer={
        <>
          New to StudioSpace?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <GoogleButton label="Log in with Google" />
        <Divider />

        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <IconInput
            id="login-email"
            name="email"
            icon={Mail}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-green-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="login-password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(c) => setRemember(c === true)}
            className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
          />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-sm font-normal"
          >
            Keep me logged in
          </Label>
        </div>

        {loading ? (
          <Button type="submit" disabled={loading} className={submitClass}>
            <Spinner data-icon="inline-start" />
            Sign In...
          </Button>
        ) : (
          <Button type="submit" className={submitClass}>
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </form>
    </AuthCard>
  )
}
