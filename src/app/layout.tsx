import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/provider"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gndecb App",
  description: "Gndecb App",
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
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
