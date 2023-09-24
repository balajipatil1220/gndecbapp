import { redirect } from "next/navigation"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SiteHeader } from "@/components/site-header"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"

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
        <>
            <SiteHeader user={user} />

        </>
    )
}
