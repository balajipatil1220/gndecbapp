import { MainNavItem, SidebarNavItem } from "@/types/nav"
import { BarChart4, Book, BookOpen, Pencil, PenBox, CalendarDays, FileText, LayoutDashboard, Shapes, UserSquare, Users, IndianRupee, Bus, Package, Coins, Building, Users2, User, Settings, Bell } from "lucide-react"

interface Navs {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const Navs: Navs = {
  mainNav: [

  ],
  sidebarNav: [
    {
      id: "fma;nlbkg",
      title: "",
      items: [
        {
          id: "m;avlnM",
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          items: []
        }, {
          id: "m;afjo",
          title: "Staffs",
          href: "/staff",
          icon: Users2,
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
    },

  ],
}
