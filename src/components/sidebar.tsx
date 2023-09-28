"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Navs } from "@/config/navs"

export function Sidebar() {
  const params = useParams();
  const pathname = usePathname()

  return (
    <div className="pb-12">
      <div className="space-y-4 ">
        {Navs.sidebarNav.map((item, index) => (
          <div key={item.id} className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {item.title}
            </h2>
            {item?.items?.length && (
              <div className="space-y-4">
                {item?.items.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`${item.href}`}
                    className={cn(
                      item.disabled && "cursor-not-allowed opacity-60",
                      pathname.startsWith(`${item.href}`) &&
                      buttonVariants({ variant: "secondary" }),
                      !pathname.startsWith(`${item.href}`) &&
                      buttonVariants({ variant: "ghost" }),
                      " w-full justify-start text-start"
                    )}
                  >
                    {item.icon && <item.icon className="mr-4 h-5 w-5" />}
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
