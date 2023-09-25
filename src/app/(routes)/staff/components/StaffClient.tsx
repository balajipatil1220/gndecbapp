"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { StaffColumn, columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

interface StaffClientProps {
    privilege: boolean,
    data: StaffColumn[];
    pageCount: number
}

const StaffClient = ({ privilege, data, pageCount }: StaffClientProps) => {

    const router = useRouter()

    return <>
        <div className="container mt-6 flex h-full w-full max-w-[60rem] flex-col space-y-4 rounded-md border p-4 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button size={"sm"} onClick={() => router.back()} variant={"ghost"} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="whitespace-nowrap text-xl font-medium tracking-tight text-primary md:text-2xl">Staff Lists</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant={"outline"} size={"sm"} className="flex items-center">
                        <RotateCw className="mr-2 h-4 w-4" />  <span className="hidden md:block">Refresh</span>
                    </Button>

                    <Button size={"sm"} onClick={() => router.push("/staff/new")} variant={"default"} className="">
                        Add New Staff
                    </Button>
                </div>
            </div>
            <Separator />
            <div>
                <DataTable columns={columns} data={data} pageCount={pageCount} />
            </div>
        </div>
    </>
};

export default StaffClient;