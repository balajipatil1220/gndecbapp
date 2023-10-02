import { Skeleton } from "@/components/ui/skeleton"
import { Bell } from "lucide-react"

export default function Loading() {
    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 rounded-sm border p-4 pt-10 md:flex md:p-8">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-bold md:text-2xl ">Reminders <Bell className="h-4 w-4 stroke-primary md:h-auto md:w-auto" /></h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                            Here&apos;s a list of Reminders
                        </p>
                    </div>

                </div>
                <div className="mt-5 h-full whitespace-nowrap md:rounded-lg md:border md:shadow-md">
                    <div className="flex flex-col items-center gap-2 p-4">
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                    </div>
                </div>
            </div>
        </>
    )
}