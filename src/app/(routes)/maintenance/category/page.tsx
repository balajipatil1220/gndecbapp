import React from "react";
import CategoryClient from "./components/categoryClient";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const getData = async () => {
    try {
        const categories = await db.maintenanceCategory.findMany();
        return categories;
    } catch (error: any) {
        throw new Error(`[maintenanceCategory server PAGE] Error retrieving remainder data: ${error.message}`);
    }
};

const Categorypage = async () => {
    const user = await getCurrentUser()

    const isAdmin = (user?.role == "ADMIN" || user?.role == "SUPERADMIN") ? true : false

    const categories = await getData()

    return <>
        <CategoryClient isAdmin={isAdmin} categories={categories} />
    </>
};

export default Categorypage;
