"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useParams, usePathname, useRouter } from "next/navigation"
import { FoldVerticalIcon, PanelRight } from "lucide-react"

import { Navs } from "@/config/navs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  const params = useParams();
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <PanelRight className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="font-bold text-primary">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="h-[calc(100vh-8rem)] pb-1 pl-4">
          <div className="flex flex-col space-y-3">
            {Navs.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={`${item.href}`}
                    href={`/${item.href}`}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2">
            {Navs.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-5 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={`${item.href}`}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            <div className="item-center flex space-x-4 font-semibold ">
                              <span> {item.icon && <item.icon className="my-1 h-4 w-4" />}</span>
                              <span>{item.title}</span></div>

                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
