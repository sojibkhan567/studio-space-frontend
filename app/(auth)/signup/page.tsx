"use client"
import Link from "next/link"
import { Mail, User, ArrowRight } from "lucide-react"

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
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >
    if (data.password !== data.confirm) {
      toast.error("Passwords don't match. Re-enter both fields.", {
        style: {
          borderRadius: "5px",
          background: "#FDEBE8",
          color: "red",
        },
      })
      setError("Passwords don't match. Re-enter both fields.")
      return
    }
    setError("")
    const { confirm: _c, ...payload } = data
    //console.log("register", { ...payload })

    setLoading(true)

    try {
      const { error: authError } = await authClient.signUp.email({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        image: payload.image,
        callbackURL: "/",
      })

      if (authError) {
        toast.error(authError.message || "Registration failed.", {
          style: {
            borderRadius: "5px",
            background: "#FDEBE8",
            color: "red",
          },
        })
        setError(authError.message || "Registration failed.")
        return
      }

      router.push("/")
      router.refresh()
      toast.success("Account has been created successfully.")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Book studios as a creator or list your own space as a host."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-700 hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <GoogleButton label="Sign up with Google" />
        <Divider />

        <div className="space-y-2">
          <Label htmlFor="reg-name">Full name</Label>
          <IconInput
            id="reg-name"
            name="name"
            icon={User}
            required
            autoComplete="name"
            placeholder="Alex Rivera"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-email">Email</Label>
          <IconInput
            id="reg-email"
            name="email"
            icon={Mail}
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-email">Profile Image Url</Label>
          <IconInput
            id="reg-email"
            name="image"
            icon={User}
            type="text"
            required
            autoComplete="url"
            placeholder="https://images.unsplash.com/photo-..."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="reg-password">Password</Label>
            <PasswordInput
              id="reg-password"
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="At least 8 characters"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-confirm">Confirm password</Label>
            <PasswordInput
              id="reg-confirm"
              name="confirm"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Repeat password"
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-sm border border-red-400 bg-red-100 px-2 py-2 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <div className="flex items-start gap-2.5">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(c) => setTerms(c === true)}
            className="mt-0.5 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
          />
          <Label
            htmlFor="terms"
            className="cursor-pointer text-sm leading-snug font-normal"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-green-700 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-green-700 hover:underline"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>
        {loading ? (
          <Button type="submit" disabled={loading} className={submitClass}>
            <Spinner data-icon="inline-start" />
            Creating...
          </Button>
        ) : (
          <Button type="submit" disabled={!terms} className={submitClass}>
            Create account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </form>
    </AuthCard>
  )
}
