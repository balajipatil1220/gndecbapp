import React from "react";
import { MaintenanceNav } from "./components/maintenanceNav";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { PermissionType, hasPrivileges } from "@/lib/server-utils";


interface DashboardLayoutProps {
    children: React.ReactNode
}

const MaintenanceLayout = async ({ children }: DashboardLayoutProps) => {

    const user = await getCurrentUser()

    const isUserExits = await db.user.findFirst({
        where: {
            id: user?.id
        }
    })

    if (!user || !isUserExits) {
        redirect("/login")
    }

    const isUserAuthenticated = await hasPrivileges(user, "MAINTENANCE", PermissionType.Read)

    if (!isUserAuthenticated) {
        redirect("/");
    }


    return <>
        <div className="p-2 py-4 md:p-0">
            <MaintenanceNav />
            {
                children
            }
        </div>
    </>
};

export default MaintenanceLayout;
