"use client"

import { Heading } from "@/components/heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Remainder, remainderStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Bell, CircleDot, CircleEllipsis } from "lucide-react";
import { CheckCircledIcon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import ReminderPagination from "./pagination";
import { DataTableRowActions } from "./cell-action";


const RemainderClient = ({ remainders, pageCount }: { remainders: Remainder[], pageCount: number }) => {

    const router = useRouter()

    return <>
        <div className="h-full flex-1 flex-col space-y-8 rounded-sm border p-4 pt-10 md:flex md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-bold md:text-2xl ">Reminders <Bell className="h-4 w-4 stroke-primary md:h-auto md:w-auto" /></h2>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Here&apos;s a list of Reminders
                    </p>
                </div>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                    <Link href={"/reminder/add"} className={cn(buttonVariants({}))}>
                        Add new Remainder
                    </Link>
                </div>
            </div>
            <div className="mt-5 whitespace-nowrap rounded-lg border shadow-md">
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {remainders.map((remainder, i) => (
                            <TableRow key={remainder.id} className={cn(i % 2 ? "bg-muted/50 hover:bg-transparent" : "hover:bg-muted/100")}>
                                <TableCell className="font-medium">{remainder.title}</TableCell>
                                <TableCell>
                                    {remainder.description?.slice(0, 50)}
                                    {remainder.description && remainder.description?.length > 50 ? "..." : ""}
                                </TableCell>
                                <TableCell >{remainder.duedate.toDateString()}</TableCell>
                                <TableCell className="flex items-center justify-center gap-2">
                                    <Badge variant={"outline"} className="p-2">
                                        <GetStatusIcon status={remainder.status} />
                                        {remainder.status.charAt(0).toUpperCase() + remainder.status.slice(1).toLocaleLowerCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DataTableRowActions id={remainder.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ReminderPagination pageCount={pageCount} />
            </div>
        </div>
    </>
};

function GetStatusIcon({ status }: { status: remainderStatus }) {
    if (status == "PENDING") {
        return <CircleDot className="mr-2 h-4 w-4 stroke-primary" />
    } else if (status == "INPROGRESS") {
        return <StopwatchIcon className="mr-2 h-4 w-4 stroke-yellow-500" />

    } else if (status == "COMPLETED") {
        return <CheckCircledIcon className="mr-2 h-4 w-4 stroke-green-500" />

    } else if (status == "EXPIRED") {
        return <CrossCircledIcon className="mr-2 h-4 w-4 stroke-red-500" />
    } else {
        return null
    }
}

export default RemainderClient