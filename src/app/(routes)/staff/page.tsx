import React from "react";
import { redirect } from "next/navigation";

import StaffClient from "./components/StaffClient";
import { getCurrentUser } from "@/lib/session";
import { PermissionType, hasPrivileges } from "@/lib/server-utils";
import { db } from "@/lib/db";
import { StaffColumn } from "./components/columns";
import { format } from "date-fns";


const getData = async (take: number,
    skip: number, query?: string) => {

    try {

        if (query) {
            const staffs = await db.user.findMany({
                take,
                skip,
                where: {
                    role: {
                        in: ["ADMIN", "STAFF", "SUPERADMIN"],
                    },
                    OR: [
                        {
                            name: { contains: query, mode: "insensitive" },
                        }
                    ],
                },

                select: {
                    id: true,
                    name: true,
                    email: true,
                    phonenumber: true,
                    gender: true,
                    role: true,
                    createdAt: true,

                },
                orderBy: {
                    createdAt: 'asc'
                }

            });
            return staffs;
        } else {
            const staffs = await db.user.findMany({
                take,
                skip,
                where: {
                    role: {
                        in: ["ADMIN", "STAFF", "SUPERADMIN"],
                    },
                    OR: [
                        {
                            role: "ADMIN",
                        },
                        {
                            role: "STAFF",
                        },
                        {
                            role: "SUPERADMIN",
                        },
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phonenumber: true,
                    gender: true,
                    role: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'asc'
                }

            });
            return staffs;
        }


    } catch (error: any) {
        throw new Error(`[Staffs server PAGE] Error retrieving user data: ${error.message}`);
    }
};


async function getTotalUsers() {
    try {
        const totalUsers = await db.user.count({})
        return totalUsers
    } catch (error: any) {
        throw new Error(`[STUDENT server PAGE] Error retrieving user data: ${error.message}`);
    }
}

const page = async ({
    searchParams
}: {
    searchParams: { page: string, per_page: string, query?: string }
}) => {
    const user = await getCurrentUser();

    const { page, per_page, query } = searchParams;

    // Number of records to show per page
    const take = typeof per_page === "string" ? parseInt(per_page) : 30;

    // Number of records to skip
    const skip = typeof page === "string" ? (parseInt(page) - 1) * take : 0;

    if (!user) {
        redirect("/")
    }
    const isUserAuthenticated = await hasPrivileges(user, "STAFFMODULE", PermissionType.Read)

    if (!isUserAuthenticated) {
        redirect("/");
    }

    const staffs = await getData(take, skip, query)

    const formatedStaffs: StaffColumn[] = staffs.map((staff) => ({
        ...staff,
        SatffId: staff.id,
        createdAt: format(staff.createdAt, 'MMMM do, yyyy'),
        updatedAt: format(staff.createdAt, 'MMMM do, yyyy')
    }))

    const totalUsers = await getTotalUsers();
    const pageCount = totalUsers === 0 ? 1 : Math.ceil(totalUsers / take);
    return <>
        <StaffClient pageCount={pageCount} data={formatedStaffs} privilege={!isUserAuthenticated} />
    </>
};

export default page;
