
import React from "react";
import RemainderClient from "./components/remainderClient";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PermissionType, hasPrivileges } from "@/lib/server-utils";


const getData = async (take: number,
    skip: number, query?: string) => {

    try {

        if (query) {
            const remainders = await db.remainder.findMany({
                take,
                skip,
                orderBy: {
                    createdAt: 'desc'
                }

            });
            return remainders;
        } else {
            const remainders = await db.remainder.findMany({
                take,
                skip,
                orderBy: {
                    createdAt: 'desc'
                }

            });
            return remainders;
        }


    } catch (error: any) {
        throw new Error(`[STUDENT server PAGE] Error retrieving remainder data: ${error.message}`);
    }
};

async function getTotalRemainders() {
    try {
        const totalRemainders = await db.remainder.count({})
        return totalRemainders
    } catch (error: any) {
        throw new Error(`[Remainder server PAGE] Error retrieving user data: ${error.message}`);
    }
}

const Reminderpage = async ({
    searchParams
}: {
    searchParams: { page: string, per_page: string, query?: string }
}) => {

    const user = await getCurrentUser();

    const { page, per_page, query } = searchParams;

    // Number of records to show per page
    const take = typeof per_page === "string" ? parseInt(per_page) : 10;

    // Number of records to skip
    const skip = typeof page === "string" ? (parseInt(page) - 1) * take : 0;


    if (!user) {
        redirect("/")
    }
    const isUserAuthenticated = await hasPrivileges(user, "STAFFMODULE", PermissionType.Read)

    if (!isUserAuthenticated) {
        redirect("/");
    }

    const remainders = await getData(take, skip, query)
    const totalUsers = await getTotalRemainders()

    const pageCount = totalUsers === 0 ? 1 : Math.ceil(totalUsers / take);

    return <>
        <RemainderClient remainders={remainders} pageCount={pageCount} />
    </>
};

export default Reminderpage;
