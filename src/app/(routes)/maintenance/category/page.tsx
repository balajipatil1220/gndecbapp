import React from "react";
import CategoryClient from "./components/categoryClient";
import { db } from "@/lib/db";

const getData = async () => {

    try {
        const categories = await db.maintenanceCategory.findMany();
        return categories;
    } catch (error: any) {
        throw new Error(`[maintenanceCategory server PAGE] Error retrieving remainder data: ${error.message}`);
    }
};

const Categorypage = async () => {
    const categories = await getData()
    return <>
        <CategoryClient categories={categories} />
    </>
};

export default Categorypage;
