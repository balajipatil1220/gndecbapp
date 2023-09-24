import Icon from "lucide-react"

export interface NavItem {
  id:string,
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: Icon.LucideIcon
  colourCode? : String
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
