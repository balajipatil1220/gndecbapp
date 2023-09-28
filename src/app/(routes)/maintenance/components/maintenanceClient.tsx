import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CircleDot, Plus, Settings2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Maintenance, MaintenanceStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { CheckCircledIcon, CrossCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { DataTableRowActions } from "../../reminder/components/cell-action";
import ReminderPagination from "../../reminder/components/pagination";

interface IMaintenance extends Maintenance {
    requestedBy: { name: string }
}

const MaintenanceClient = ({ maintenances, pageCount }: { maintenances: IMaintenance[], pageCount: number }) => {
    return <div className="h-full flex-1 flex-col space-y-8 rounded-sm border p-4 pt-10 md:flex md:p-8">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="flex items-center gap-2 text-lg font-bold md:text-2xl ">Maintenances <Settings2 className="h-4 w-4 stroke-primary md:h-auto md:w-auto" /></h2>
                <p className="text-sm text-muted-foreground md:text-base">
                    Here&apos;s a list of Maintenance
                </p>
            </div>
            <div className="flex items-center space-x-2 whitespace-nowrap">
                <Link href={"/maintenance/request/add"} className={cn(buttonVariants({}))}>
                    <Plus className="h4 mr-2 w-4 " />  Make Request
                </Link>
            </div>
        </div>
        <div className="mt-5 h-full whitespace-nowrap rounded-lg border shadow-md">
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {maintenances.map((m, i) => (
                        <TableRow key={m.id} className={cn(i % 2 ? "bg-muted/50 hover:bg-transparent" : "hover:bg-muted/100")}>
                            <TableCell className="font-medium">{m.name}</TableCell>
                            <TableCell>
                                {m.description?.slice(0, 50)}
                                {m.description && m.description?.length > 50 ? "..." : ""}
                            </TableCell>
                            <TableCell >
                                <Badge variant={"default"} className="p-2">
                                    {
                                        m.MaintenanceType.charAt(0).toUpperCase() + m.MaintenanceType.slice(1).toLocaleLowerCase()
                                    }
                                </Badge>
                            </TableCell>
                            <TableCell className="flex items-center justify-center gap-2">
                                <Badge variant={"outline"} className="p-2">
                                    <GetStatusIcon status={m.status} />
                                    {m.status.charAt(0).toUpperCase() + m.status.slice(1).toLocaleLowerCase()}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DataTableRowActions id={m.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ReminderPagination pageCount={pageCount} />
        </div>
    </div>;
};


function GetStatusIcon({ status }: { status: MaintenanceStatus }) {
    if (status == "PENDING") {
        return <CircleDot className="mr-2 h-4 w-4 stroke-primary" />
    } else if (status == "INPROGRESS") {
        return <StopwatchIcon className="mr-2 h-4 w-4 stroke-yellow-500" />

    } else if (status == "COMPLETED") {
        return <CheckCircledIcon className="mr-2 h-4 w-4 stroke-green-500" />

    } else if (status == "REJECTED") {
        return <CrossCircledIcon className="mr-2 h-4 w-4 stroke-red-500" />
    } else {
        return null
    }
}
export default MaintenanceClient;
