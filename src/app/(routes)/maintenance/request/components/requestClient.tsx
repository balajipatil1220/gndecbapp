"use client"

import { Maintenance, MaintenanceStatus, MaintenanceType } from "@prisma/client";
import { Check, Loader2, MessageSquare, Plus, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

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
import axios from "axios";
import { env } from "@/env.mjs";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { GetStatusIcon } from "../../components/maintenanceClient";

interface IMaintenance extends Maintenance {
    requestedBy: { name: string },
}

const RequestClient = ({ maintenanceRequests, isPrivilageForUpdate }: { maintenanceRequests: IMaintenance[], isPrivilageForUpdate: boolean }) => {

    const [isLoading, setisLoading] = useState(false);

    const params = useParams();
    const router = useRouter();


    async function handleRequestStatus({ id, status }: { id: string, status: MaintenanceStatus }) {
        setisLoading(true)

        try {
            const resp = await axios.patch(
                `${env.NEXT_PUBLIC_APP_URL}/api/maintenance/request`,
                {
                    id, status
                }
            )

            router.refresh();
            router.push(`/maintenance/${id}`);

            toast.success(resp.data.msg, {
                duration: 2000,
            })

        } catch (error) {
            toast.error("Something gone wrong", {
                duration: 2000,
            })
        } finally {
            setisLoading(false)
        }
    }

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
                                {isPrivilageForUpdate ? (<> <Button onClick={() => handleRequestStatus({ id: mr.id, status: "REJECTED" })} variant={"destructive"}>
                                    {isLoading ? <Loader2 className="h4 w-4 animate-spin" /> : <X className="mr-1 h-4 w-4" />}Reject
                                </Button>
                                    <Button onClick={() => handleRequestStatus({ id: mr.id, status: "INPROGRESS" })} variant={"outline"}>
                                        {isLoading ? <Loader2 className="h4 w-4 animate-spin" /> : <Check className="mr-1 h-4 w-4 stroke-green-500" />} Accept
                                    </Button>
                                    <Link href={`/maintenance/${mr.id}`} className={cn(buttonVariants({ variant: "outline" }))}>View</Link>
                                </>
                                ) : <Button variant={"secondary"}>
                                    <GetStatusIcon status={mr.status} />
                                    {mr.status.charAt(0).toUpperCase() + mr.status.slice(1).toLocaleLowerCase()}
                                </Button>
                                }
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>

        </div>
    </div>;
};

export default RequestClient;
