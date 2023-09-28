import React from "react";
import MaintenanceClient from "./components/maintenanceClient";
import { db } from "@/lib/db";

const getData = async (take: number,
    skip: number, query?: string) => {

    try {
        const maintenances = await db.maintenance.findMany({
            take,
            skip,
            where: {
                NOT: {
                    status: "PENDING"
                }
            },
            include: {
                requestedBy: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {

            }
        });
        return maintenances;
    } catch (error: any) {
        throw new Error(`[maintenances server PAGE] Error retrieving remainder data: ${error.message}`);
    }
};


async function getTotalMaintenances() {
    try {
        const totalUsers = await db.maintenance.count({
            where: {
                NOT: {
                    status: "PENDING"
                }
            }
        })
        return totalUsers
    } catch (error: any) {
        throw new Error(`[STUDENT server PAGE] Error retrieving user data: ${error.message}`);
    }
}


const Maintenancepage = async ({
    searchParams
}: {
    searchParams: { page: string, per_page: string, query?: string }
}) => {
    const { page, per_page, query } = searchParams;

    // Number of records to show per page
    const take = typeof per_page === "string" ? parseInt(per_page) : 20;

    // Number of records to skip
    const skip = typeof page === "string" ? (parseInt(page) - 1) * take : 0;

    const maintenances = await getData(take, skip, query)

    const TotalMaintenances = await getTotalMaintenances();
    const pageCount = TotalMaintenances === 0 ? 1 : Math.ceil(TotalMaintenances / take);

    return <>
        <MaintenanceClient maintenances={maintenances} pageCount={pageCount} />
    </>
};

export default Maintenancepage;
