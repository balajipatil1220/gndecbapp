"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { MaintenanceCategory } from "@prisma/client"
import { Edit, Loader2, Trash } from "lucide-react"
import { toast } from "react-hot-toast"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { AlertModal } from "@/components/modals/alert-modal"
import axios from "axios"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"

async function deletechat(chatId: string) {
    const response = await fetch(`/api/chat-gpt/${chatId}`, {
        method: "DELETE",
    })

    if (!response?.ok) {
        toast.error("chat deleted")
    }

    return true
}


export function CategoryOperations({ category }: { category: MaintenanceCategory }) {
    const router = useRouter()

    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/maintenance/category/${category.id}`);
            toast.success('category deleted.');
            router.refresh();
        } catch (error) {
            toast.error('Something Gone Wrong');
        } finally {
            setOpen(false);
            setLoading(false);
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
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    // onClick={() => data.SatffId && router.push(`/${params.Institutionslug}/staff/${data.SatffId}/edit`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                        className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}