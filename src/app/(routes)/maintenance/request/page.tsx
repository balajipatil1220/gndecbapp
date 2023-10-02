import React from "react";
import RequestClient from "./components/requestClient";
import { db } from "@/lib/db";
import { PermissionType, hasPrivileges } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { getAllMaintenanceRequestData, getMaintenanceRequestDataByUser } from "../utils";

const Requestpage = async () => {

    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    let maintenances = null
    if (user?.role == "ADMIN" || user?.role == "SUPERADMIN") {

        maintenances = (await getAllMaintenanceRequestData()).map(m => ({
            ...m, requestedBy: { name: m.MaintenanceRequestUser?.user.name as string }
        }))
    } else {
        maintenances = (await getMaintenanceRequestDataByUser(user?.id || "")).map(m => ({
            ...m, requestedBy: { name: m.MaintenanceRequestUser?.user.name as string }
        }))
    }

    const isPrivilageForUpdate = await hasPrivileges(user, "MAINTENANCE", PermissionType.Update)


    return <div>
        <RequestClient isPrivilageForUpdate={isPrivilageForUpdate} maintenanceRequests={maintenances} />
    </div>;
};

export default Requestpage;
