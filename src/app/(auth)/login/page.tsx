import Link from "next/link"
import { Metadata } from "next"

import { UserLoginForm } from "./components/loginForm"

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container mt-36 grid flex-col items-center justify-center lg:max-w-none lg:px-0">
        <div className="mx-auto flex w-full flex-col  justify-center space-y-2 ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your Details below to Login your account
            </p>
          </div>
          <UserLoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
