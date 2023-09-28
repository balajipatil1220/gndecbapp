import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import RemainderForm from "../components/remainderForm";

const RemainderAddpage = () => {
    return <>
        <div className="w-full flex-1 space-y-4 overflow-x-auto px-6 pt-4">
            <div className="h-full flex-col">
                <div className="flex items-center justify-between">
                    <Heading title={`Add Remainder`} description="" />
                </div>
                <Separator className="mt-3" />
                <RemainderForm />
                <div className="h-40"></div>
            </div>
        </div>
    </>
};

export default RemainderAddpage;
