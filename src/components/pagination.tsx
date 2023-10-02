"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,

} from "@/components/ui/select";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const ReminderPagination = ({ pageCount }: { pageCount: number }) => {
    const [isPending, startTransition] = React.useTransition();

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const page = searchParams?.get("page") ?? "1";
    const per_page = searchParams?.get("per_page") ?? "5";

    React.useEffect(() => {
        router.push(
            `${pathname}?${createQueryString({
                page,
            })}`,
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [pagination, setPagination] = React.useState({
        pageIndex: Number(page) - 1,
        pageSize: Number(per_page),
    });

    const createQueryString = React.useCallback(
        (params: Record<string, string | number | null>) => {
            const newSearchParams = new URLSearchParams(searchParams?.toString());

            for (const [key, value] of Object.entries(params)) {
                if (value === null) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, String(value));
                }
            }

            return newSearchParams.toString();
        },
        [searchParams],
    );

    return <>
        <div className="flex flex-col-reverse items-center justify-center gap-4 py-2 md:flex-row">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                <div className="flex flex-wrap items-center space-x-2">
                    <span className="text-sm font-medium">Rows per page</span>
                    <Select
                        value={per_page ?? "10"}
                        onValueChange={(value) => {
                            startTransition(() => {
                                router.push(
                                    `${pathname}?${createQueryString({
                                        page: 1,
                                        per_page: value,
                                    })}`,
                                );
                            });
                        }}
                        disabled={isPending}
                    >
                        <SelectTrigger className="h-8 w-16">
                            <SelectValue placeholder={per_page} />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 15, 20].map((item) => (
                                <SelectItem key={item} value={item.toString()}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-sm font-medium">{`Page ${page} of ${pageCount}`}</div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            startTransition(() => {
                                router.push(
                                    `${pathname}?${createQueryString({
                                        page: 1,
                                        per_page,
                                    })}`,
                                );
                            });
                        }}
                        disabled={Number(page) === 1 || isPending}
                    >
                        <ChevronsLeft
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                        <span className="sr-only">First page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            startTransition(() => {
                                router.push(
                                    `${pathname}?${createQueryString({
                                        page: Number(page) - 1,
                                        per_page,
                                    })}`,
                                );
                            });
                        }}
                        disabled={Number(page) === 1 || isPending}
                    >
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            startTransition(() => {
                                router.push(
                                    `${pathname}?${createQueryString({
                                        page: Number(page) + 1,
                                        per_page,
                                    })}`,
                                );
                            });
                        }}
                        disabled={Number(page) >= (pageCount ?? 1) || isPending}
                    >
                        <ChevronRight
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Next page</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                            router.push(
                                `${pathname}?${createQueryString({
                                    page: pageCount ?? 1,
                                    per_page,
                                })}`,
                            );
                        }}
                        disabled={Number(page) >= (pageCount ?? 1) || isPending}
                    >
                        <ChevronsRight
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Last page</span>
                    </Button>
                </div>
            </div>
        </div>
    </>
};

export default ReminderPagination;