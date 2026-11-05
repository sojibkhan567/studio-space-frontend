import RegisterForm from "@/components/auth/register-form"
import { AuthCard } from "@/components/common/AuthShared"
import Link from "next/link"

export const metadata = { title: "Sign Up | Studio Space Application" }

export default function RegisterPage() {
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
      <RegisterForm />
    </AuthCard>
  )
}
