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
import { Edit, Eye, Pin, Trash } from "lucide-react"
import { AlertModal } from "@/components/modals/alert-modal"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import * as z from "zod"


export function DataTableRowActions({ id, isAdmin }: { id: string, isAdmin: boolean }) {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/maintenance/${id}`);
            toast.success('maintenance deleted.');
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
                onClose={() => setOpen(false)}
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
                <DropdownMenuContent align="end" className="">
                    <DropdownMenuItem><Pin className="mr-2 h-4 w-4" /> Pin</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/maintenance/${id}`)}>  <Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                    {isAdmin ? <>
                        <DropdownMenuItem onClick={() => router.push(`/maintenance/${id}/edit`)}>  <Edit className="mr-2 h-4 w-4" /> Update</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setOpen(true)}>
                            <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </> : ""
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}