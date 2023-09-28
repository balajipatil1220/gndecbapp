import { redirect } from "next/navigation"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SiteHeader } from "@/components/site-header"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"
import { Sidebar } from "@/components/sidebar"
import { SiteFooter } from "@/components/site-footer"

interface DashboardLayoutProps {
    children: React.ReactNode
}


export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const user = await getCurrentUser()

    const isUserExits = await db.user.findFirst({
        where: {
            id: user?.id
        }
    })

    if (!user || !isUserExits) {
        redirect("/login")
    }

    return (
        <div>
            <SiteHeader user={user} />
            <div className="">
                <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)]  lg:grid-cols-[240px_minmax(0,1fr)]">
                    <aside className="fixed top-14 z-30 ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
                        <ScrollArea className="h-full pr-6 ">
                            <Sidebar />
                        </ScrollArea>
                    </aside>
                    <div className="h-full w-full flex-col">
                        <div className="h-full flex-1 space-y-4 md:p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <SiteFooter />
        </div>
    )
}
