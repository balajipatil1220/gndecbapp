import React from "react";
import RequestClient from "./components/requestClient";
import { db } from "@/lib/db";

const getData = async () => {

    try {
        const maintenances = await db.maintenance.findMany({
            where: {
                status: "PENDING"
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

const Requestpage = async () => {

    const maintenances = await getData()

    return <div>
        <RequestClient maintenanceRequests={maintenances} />
    </div>;
};

export default Requestpage;
