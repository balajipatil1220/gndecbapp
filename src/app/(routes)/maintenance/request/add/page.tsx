import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import RequestForm from "../components/requestForm";

const RequestMaintenanceAddpage = () => {
    return <>
        <div className="w-full flex-1 space-y-4 overflow-x-auto px-6 pt-4">
            <div className="h-full flex-col">
                <div className="flex items-center justify-between">
                    <Heading title={`Request For Maintenance`} description="" />
                </div>
                <Separator className="mt-3" />
                <RequestForm />
                <div className="h-40"></div>
            </div>
        </div>

    </>
};

export default RequestMaintenanceAddpage;
