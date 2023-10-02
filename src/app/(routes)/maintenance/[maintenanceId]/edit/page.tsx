import { db } from "@/lib/db";
import React from "react";
import MaintenanceUpdateForm from "./components/maintenanceUpdateForm";

const getData = async (maintenanceId: string) => {

    try {
        const maintenance = await db.maintenance.findFirstOrThrow({
            where: {
                id: maintenanceId
            }, include: {
                maintenanceCategory: true,
            }
        })
        return maintenance;
    } catch (error: any) {
        throw new Error(`[maintenance server PAGE] Error retrieving maintenance data: ${error.message}`);
    }
};


const EditMaintenancepage = async ({ params }: {
    params: {
        maintenanceId: string
    }
}) => {

    const data = await getData(params.maintenanceId)

    return <>
        <MaintenanceUpdateForm data={{ title: data.name, description: data.description || "", categoryID: data.maintenanceCategory.id, MaintenanceType: data.MaintenanceType, status: data.status }} />
    </>
};

export default EditMaintenancepage;
