"use client"
import { Navs } from "@/config/navs"
import { cn } from "@/lib/utils";
import { Bell, LayoutDashboard, Settings, User, Users2 } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";


const items = [
    {
        id: "m;avlnM",
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        items: []
    }, {
        id: "anfkcmxnc",
        title: "Reminders",
        href: "/reminder",
        icon: Bell,
        items: []
    }, {
        id: "aNLBJK",
        title: "Maintenance",
        href: "/maintenance",
        icon: Settings,
        items: []
    }, {
        id: "mankcow",
        title: "Profile",
        href: "/profile",
        icon: User,
        items: []
    },

]

export const MobileBottomNavbar = () => {

    const pathname = usePathname()
    const params = useParams()


    function isActive(href: string) {
        if (href == '' && pathname.split('/')
            .filter(link => link !== '').length == 1) {
            return true
        }
        return pathname.split('/')
            .filter(link => link !== '').includes(href)
    }

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-between bg-white p-4 shadow-md md:hidden">
            {items.map((item, index) => (
                <Link key={item.href} href={item.href}>
                    <div className={cn("flex flex-col items-center", isActive(item.href.replace('/', ''))
                        ? "font-bold text-primary"
                        : "text-lg font-medium text-muted-foreground")}>
                        <div className="mb-1 text-lg">{item.icon && <item.icon className="my-1 h-4 w-4" />}</div>
                        <div className="text-xs">{item.title}</div>
                    </div>
                </Link>
            ))}
        </nav>
    );
};
