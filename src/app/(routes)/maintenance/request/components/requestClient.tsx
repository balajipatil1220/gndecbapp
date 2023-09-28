"use client"

import { Maintenance } from "@prisma/client";
import { Check, MessageSquare, Plus, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

interface IMaintenance extends Maintenance {
    requestedBy: { name: string }
}

const RequestClient = ({ maintenanceRequests }: { maintenanceRequests: IMaintenance[] }) => {
    return <div className="h-full flex-1 flex-col space-y-8 rounded-sm border p-4 pt-10 md:flex md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="flex items-center gap-2 text-lg font-bold md:text-2xl ">Request <MessageSquare className="h-4 w-4 stroke-primary md:h-auto md:w-auto" /></h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    Here&apos;s a list of Request
                </p>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
                <Link href={"/maintenance/request/add"} className={cn(buttonVariants({}))}>
                    <Plus className="h4 mr-2 w-4 " />  Make Request
                </Link>
            </div>
        </div>
        <div className="mt-5 h-full">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {
                    maintenanceRequests.map((mr) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {mr.name}
                                    <Badge variant={"outline"} className="md:ml-2">{mr.MaintenanceType}</Badge>
                                </CardTitle>
                                <CardDescription>
                                    {mr.description?.slice(0, 40)}
                                    {mr.description && mr.description.length > 40 ? "..." : ""}
                                </CardDescription>
                                <div className="flex gap-2">
                                    <span>RequestedBy : {mr.requestedBy.name}</span>
                                </div>
                            </CardHeader>
                            <CardFooter className="flex items-center gap-4 pt-0">
                                <Button variant={"destructive"}><X className="mr-1 h-4 w-4" /> Reject</Button>
                                <Button variant={"outline"}><Check className="mr-1 h-4 w-4 stroke-green-500" /> Accept</Button>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>

        </div>
    </div>;
};

export default RequestClient;
