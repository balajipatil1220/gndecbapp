import { Skeleton } from "@/components/ui/skeleton"
import { Settings2 } from "lucide-react"

export default function Loading() {
    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 p-1 pt-4 md:flex md:rounded-sm md:border md:p-8 md:pt-10">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-bold md:text-2xl ">Maintenances <Settings2 className="h-4 w-4 stroke-primary md:h-auto md:w-auto" /></h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                            Here&apos;s a list of Maintenance
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 whitespace-nowrap">

                    </div>
                </div>
                <div className="w-full">

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