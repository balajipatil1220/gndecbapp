import React from "react";
import MaintenanceClient from "./components/maintenanceClient";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { getAllMaintenanceData, getMaintenanceDataByUser } from "./utils";

async function getTotalMaintenances(userId?: string) {
    try {
        if (userId) {
            const totalUsers = await db.maintenance.count({
                where: {
                    MaintenanceRequestUser: {
                        userId
                    },
                    NOT: {
                        status: "PENDING"
                    },
                }
            })
            return totalUsers
        }

        const totalUsers = await db.maintenance.count({
            where: {
                NOT: {
                    status: "PENDING"
                },
            }
        })
        return totalUsers
    } catch (error: any) {
        throw new Error(`[Maintenance server PAGE] Error retrieving user data: ${error.message}`);
    }
}


const Maintenancepage = async ({
    searchParams
}: {
    searchParams: { page: string, per_page: string, query?: string }
}) => {

    const user = await getCurrentUser()

    const { page, per_page, query } = searchParams;

    // Number of records to show per page
    const take = typeof per_page === "string" ? parseInt(per_page) : 5;

    // Number of records to skip
    const skip = typeof page === "string" ? (parseInt(page) - 1
    ) * take : 0;

    let maintenances = null
    let TotalMaintenances = null

    if (user?.role == "ADMIN" || user?.role == "SUPERADMIN") {
        maintenances = (await getAllMaintenanceData(take, skip, query)).map(m => ({
            ...m, category: m.maintenanceCategory.name, requestedBy: { name: m.MaintenanceRequestUser?.user.name as string }
        }))
        TotalMaintenances = await getTotalMaintenances();
    } else {
        maintenances = (await getMaintenanceDataByUser(take, skip, user?.id || "", query,)).map(m => ({
            ...m, category: m.maintenanceCategory.name, requestedBy: { name: m.MaintenanceRequestUser?.user.name as string }
        }))
        TotalMaintenances = await getTotalMaintenances(user?.id);
    }


    const pageCount = TotalMaintenances === 0 ? 1 : Math.ceil(TotalMaintenances / take);

    const isAdmin = (user?.role == "ADMIN" || user?.role == "SUPERADMIN") ? true : false


    return <>
        <MaintenanceClient isAdmin={isAdmin} maintenances={maintenances} pageCount={pageCount} />
    </>
};

export default Maintenancepage;
