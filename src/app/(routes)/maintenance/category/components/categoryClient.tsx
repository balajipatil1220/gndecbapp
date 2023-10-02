import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, LayoutList, MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import NewCategoryForm from "./newCategoryForm";
import { MaintenanceCategory } from "@prisma/client";
import format from "date-fns/format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryOperations } from "./categoryActions";

const CategoryClient = ({ categories, isAdmin }: { categories: MaintenanceCategory[], isAdmin: boolean }) => {
    return <>
        <div className="h-full flex-1 flex-col space-y-8 rounded-sm border p-4 pt-10 md:flex md:p-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-bold md:text-2xl ">Categories <LayoutList className="h-4 w-4 stroke-primary md:h-auto md:w-auto" /></h2>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Here&apos;s a list of Category
                    </p>
                </div>
                <div className="flex items-center space-x-2 whitespace-nowrap">
                    {isAdmin ? <NewCategoryForm /> : ""}
                </div>
            </div>
            <div className="mt-5 h-full ">
                <div className="flex w-full flex-col gap-2">
                    <div className="grid grid-cols-1 gap-2  lg:grid-cols-4">
                        {
                            categories.map((category, i) => (
                                <div className="flex w-full items-center justify-between space-y-2 rounded-md border p-2 text-left shadow-md">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                            <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <h2 className="text-xl font-medium">
                                            {category.name}
                                        </h2>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {isAdmin ? <CategoryOperations category={category} /> : ""}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CategoryClient;
