import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Edit, Plus, Settings2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GetStatusIcon } from "../components/maintenanceClient";
import { getCurrentUser } from "@/lib/session";

const getData = async (maintenanceId: string) => {

    try {
        const maintenance = await db.maintenance.findFirstOrThrow({
            where: {
                id: maintenanceId
            }, include: {
                maintenanceCategory: true,
                MaintenanceRequestUser: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                phonenumber: true
                            }
                        }
                    }
                },
                MaintenanceAcceptedUser: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                phonenumber: true
                            }
                        }
                    }
                },
            }
        })
        return maintenance;
    } catch (error: any) {
        throw new Error(`[maintenance server PAGE] Error retrieving maintenance data: ${error.message}`);
    }
};


const MaintenancePage = async ({ params }: {
    params: {
        maintenanceId: string
    }
}) => {

    const user = await getCurrentUser()


    const maintenance = await getData(params.maintenanceId)
    return <>
        <div className="h-full flex-1 flex-col space-y-8 rounded-sm border p-4 pt-10 md:flex md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-bold md:text-2xl ">Maintenance <Settings2 className="h-4 w-4 stroke-primary md:h-auto md:w-auto" /></h2>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Here&apos;s a  Maintenance
                    </p>
                </div>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                    {(user?.role === "ADMIN" || user?.role === "SUPERADMIN") ? <Link href={`/maintenance/${params.maintenanceId}/edit`} className={cn(buttonVariants({ size: "sm" }))}>
                        <Edit className="h4 mr-2 w-4 " />Edit <span className="hidden md:inline">maintenance</span>
                    </Link>
                        : ""
                    }
                </div>
            </div>
            <div className="max-w-md">
                {/* <div className="flex flex-col gap-2 rounded-md border p-4 shadow-sm">
                    <h1 className="text-xl font-medium">{maintenance.name}</h1>
                    <p>{maintenance.description}</p>
                    <div className="flex items-center gap-2">
                        <Badge variant={"outline"}>
                            {maintenance.MaintenanceType.charAt(0).toUpperCase() + maintenance.MaintenanceType.slice(1).toLocaleLowerCase()}
                        </Badge>
                        <Badge variant={"outline"}>{maintenance.maintenanceCategory.name}</Badge>
                        <Badge variant={maintenance.status == "REJECTED" ? "destructive" : "default"}>
                            {maintenance.status.charAt(0).toUpperCase() + maintenance.status.slice(1).toLocaleLowerCase()}
                        </Badge>
                    </div>
                    <div className="mt-2">
                        <span className="font-medium">Requested By : </span>
                        <span>{maintenance.MaintenanceRequestUser?.user.name}</span>
                    </div>
                    <div className="mt-2">
                        {maintenance.MaintenanceAcceptedUser.map(u => (
                            <>
                                <div className="flex items-center gap-4">
                                    <span className="font-medium">Accepted By : </span>
                                    <span>{u.user.name}</span>
                                    <Badge variant={u.status == "REJECTED" ? "destructive" : "default"}>
                                        {u.status.charAt(0).toUpperCase() + u.status.slice(1).toLocaleLowerCase()}
                                    </Badge>
                                </div>
                            </>
                        ))}
                    </div>
                </div> */}

                <Card>
                    <CardHeader>
                        <CardTitle>  {maintenance.name}
                        </CardTitle>
                        <CardDescription>
                            {maintenance.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium tracking-wide md:text-base">Status</span>
                            </div>
                            <div className="grid gap-6">
                                <Button variant={"secondary"}>
                                    {<GetStatusIcon status={maintenance.status} />}
                                    {maintenance.status.charAt(0).toUpperCase() + maintenance.status.slice(1).toLocaleLowerCase()}
                                </Button>
                            </div>
                        </div>
                        {/* <Separator className="my-5 border-2" /> */}
                        <div className="my-5 space-y-4">
                            <h4 className="text-left text-xl font-[400] tracking-wide">Activities</h4>
                            <div className="space-y-4 border-t py-2">
                                <div className="flex flex-row-reverse items-center justify-between">
                                    <h4 className="text-sm font-medium tracking-wide md:text-base">User</h4>
                                    <span className="text-sm font-medium tracking-wide md:text-base">Status</span>
                                </div>
                                <div className="grid gap-6">
                                    {
                                        <div className="flex flex-row-reverse items-center justify-between gap-2">
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <Avatar className="hidden sm:block">
                                                    <AvatarImage src="/avatars/03.png" />
                                                    <AvatarFallback className="bg-primary/80 text-white">{maintenance.MaintenanceRequestUser?.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>

                                                <div>
                                                    <p className="text-sm font-medium leading-none">
                                                        {maintenance.MaintenanceRequestUser?.user.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {maintenance.MaintenanceRequestUser?.user.phonenumber}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant={"secondary"}>
                                                {<GetStatusIcon status={"PENDING"} />}
                                                {"Pending"}
                                            </Button>
                                        </div>
                                    }
                                    {maintenance.MaintenanceAcceptedUser.map(u => (
                                        <div className="flex flex-row-reverse items-center  justify-between gap-2">
                                            <div className="flex flex-row-reverse items-center gap-2">
                                                <Avatar className="">
                                                    <AvatarImage src="/avatars/03.png" />
                                                    <AvatarFallback className="bg-primary/80 text-white">{u.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium leading-none">
                                                        {u.user.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {u.user.phonenumber}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant={"secondary"}>
                                                {<GetStatusIcon status={u.status} />}
                                                {u.status.charAt(0).toUpperCase() + u.status.slice(1).toLocaleLowerCase()}
                                            </Button>
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>


                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
};

export default MaintenancePage;
