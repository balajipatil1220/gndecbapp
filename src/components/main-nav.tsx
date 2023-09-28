"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-2 flex items-center space-x-2">
        <span className="text-gradient hidden bg-gradient-to-r  from-blue-500 via-purple-500 to-yellow-300 bg-clip-text text-2xl font-bold text-transparent sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">

      </nav>
    </div>
  )
}
