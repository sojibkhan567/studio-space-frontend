import LoginForm from "@/components/auth/login-form"
import { AuthCard } from "@/components/common/AuthShared"
import Link from "next/link"

export const metadata = { title: "Login | Studio Space Application" }

export default function LoginPage() {
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
      <LoginForm />
    </AuthCard>
  )
}
