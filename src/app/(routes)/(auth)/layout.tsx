import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { redirect } from "next/navigation"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser()

  if (user) {
    console.log(user, "user is present auth");

    redirect("/dashboard")
  }

  return (
    <>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        Home
      </Link>
      <div className="flex items-center justify-center">{children}</div>
    </>
  )
}
