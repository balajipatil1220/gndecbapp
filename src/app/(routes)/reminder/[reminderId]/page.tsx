import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import React from "react";

const getData = async (reminderId: string) => {

    try {
        const reminder = await db.remainder.findFirst({
            where: {
                id: reminderId
            }
        })

        return reminder

    } catch (error: any) {
        throw new Error(`[reminder server PAGE] Error retrieving remainder data: ${error.message}`);
    }
};


const Reminderpage = async ({ params }: {
    params: {
        reminderId: string
    }
}) => {


    const data = await getData(params.reminderId)

    return <>
        <div className="w-full flex-1 space-y-4 overflow-x-auto px-6 pt-4">
            <div className="h-full flex-col">
                <div className="flex items-center justify-between">
                    <Heading title={`Edit Remainder`} description="" />
                </div>
                <Separator className="mt-3" />
                <div className="h-40"></div>
            </div>
        </div>
    </>
};

export default Reminderpage;
