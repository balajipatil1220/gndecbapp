import { User } from "next-auth"

import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserAccountNav } from "./user-nav"

interface SiteHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">,
}

export function SiteHeader({ user }: SiteHeaderProps) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b shadow-md backdrop-blur md:shadow-none">
      <div className="flex h-14 items-center p-6 max-xl:p-6">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center">

            {user ? (
              <>
                <UserAccountNav user={user} />
              </>
            ) : (
              ""
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
