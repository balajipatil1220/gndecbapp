import { db } from "@/lib/db";
import { PermissionType, hasPrivileges } from "@/lib/server-utils";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import UpdateStaffForm from "../components/staffUpdateForm";
import { Gender, ModuleName } from "@prisma/client";


const getData = async (staffId: string) => {

    try {

        return await db.user.findFirstOrThrow({
            where: {
                id: staffId
            }, include: {
                Privilege: {
                    include: {
                        permissions: true
                    }
                }
            }
        })

    } catch (error: any) {
        throw new Error(`[Staffs server PAGE] Error retrieving user data: ${error.message}`);
    }
};

const StaffEditpage = async ({ params }: { params: { staffId: string } }) => {

    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const isUserAuthenticated = await hasPrivileges(user, "STAFFMODULE", PermissionType.Read)

    if (!isUserAuthenticated) {
        redirect("/");
    }

    const data = await getData(params.staffId)

    return <>
        <UpdateStaffForm data={{
            name: data.name, email: data.email, phonenumber: data.phonenumber, address: data.address || "", role: data.role, gender: data.gender as Gender, Privilege: {
                permissions: data.Privilege?.permissions.map((p) => ({
                    moduleName: p.moduleName as ModuleName,
                    Read: p.Read,
                    Write: p.Write,
                    Update: p.Update,
                    Delete: p.Delete,
                })) as any
            }
        }} />
    </>
};

export default StaffEditpage;
