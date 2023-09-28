"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import React from "react"
import { List, MessageSquare, Settings, Settings2, } from "lucide-react"

const examples = [
    {
        name: "Maintenance",
        href: "",
        icon: Settings2,
    },
    {
        name: "Requests",
        href: "/request",
        icon: MessageSquare,
    }, {
        name: "Category",
        href: "/category",
        icon: List,
    },
    {
        name: "Settings",
        href: "/afjl",
        icon: Settings,
    },
]

interface MaintenanceNavProps extends React.HTMLAttributes<HTMLDivElement> { }

export function MaintenanceNav({ className, ...props }: MaintenanceNavProps) {
    const pathname = usePathname()
    const params = useParams()

    return (
        <div className="relative">
            <ScrollArea className="max-w-[600px] lg:max-w-none">
                <div className={cn("mb-4 flex items-center space-x-2 rounded-md border p-2 shadow-sm", className)} {...props}>
                    {examples.map((example) => (
                        <Link
                            href={`/maintenance${example.href}`}
                            key={example.href}
                            className={cn(
                                "flex items-center whitespace-nowrap rounded-md p-2 hover:bg-muted/60 ",
                                pathname?.startsWith(`/maintenance${example.href}`)
                                    ? "bg-muted font-bold text-primary"
                                    : "font-medium text-muted-foreground"
                            )}
                        >
                            <example.icon className="mr-2" />
                            {example.name}
                        </Link>
                    ))}

                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
        </div>
    )
}
