import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <>
            <div className="container mt-6 flex h-full w-full max-w-[60rem] flex-col space-y-4 rounded-md border p-4 shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h2 className="whitespace-nowrap text-xl font-medium tracking-tight text-primary md:text-2xl">Staff Lists</h2>
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