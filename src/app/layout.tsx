import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/provider"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"

const poppins = Poppins({ weight: "400", subsets: ["devanagari"] });

export const metadata: Metadata = {
  title: "Gndecb App",
  description: "Gndecb App",
  manifest: '/manifest.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans tracking-wide antialiased",
          poppins.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
