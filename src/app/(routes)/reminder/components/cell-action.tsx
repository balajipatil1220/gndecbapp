"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Pin, Trash } from "lucide-react"
import { AlertModal } from "@/components/modals/alert-modal"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { RemainderformSchema } from "./reminderEditForm"
import * as z from "zod"

interface RemainderSchema extends z.infer<typeof RemainderformSchema> {
    id: string
}

export function DataTableRowActions({ data, isAdmin }: { data: RemainderSchema, isAdmin: boolean }) {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/reminder/${data.id}`);
            toast.success('reminder deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Something Gone Wrong');
        } finally {
            setOpen(false);
            setLoading(false);
            location.reload()
        }
    };


    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => {
                    setOpen(false)
                    location.reload()
                }}
                onConfirm={onConfirm}
                loading={loading}
                description="This data will be deleted permanent"
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                {isAdmin && <DropdownMenuContent align="end" className="">
                    <DropdownMenuItem onClick={() => router.push(`/reminder/${data.id}/edit`)}>  <Edit className="mr-2 h-4 w-4" /> Update</DropdownMenuItem>
                    <DropdownMenuItem><Pin className="mr-2 h-4 w-4" /> Pin</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>}
            </DropdownMenu>
        </>
    )
}