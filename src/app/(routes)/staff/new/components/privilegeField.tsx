import { UseFormReturn } from "react-hook-form";
import * as z from "zod"


import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { StaffformSchema } from "./newStaffClient";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const PrivilegeFormField = ({ form }: { form: UseFormReturn<z.infer<typeof StaffformSchema>> }) => {
    return (
        <>
            <FormField
                control={form.control}
                name="Privilege.permissions"
                render={({ field }) => (
                    <>
                        <FormItem className="col-span-2 p-2">
                            <div className="space-y-2">
                                <h3 className="text-xl font-medium">Permissions <span className="text-red-700">*</span></h3>
                                <p className="text-sm text-muted-foreground">
                                    Give Permissions to Staff
                                </p>
                                <Separator className="mt-2" />
                            </div>
                            <div className="flex flex-col ">
                                <div className="grid grid-cols-2 gap-2 space-y-2 rounded-t-md border p-2 md:p-4">
                                    <h4 className="font-semibold">Module Name</h4>
                                    <div className=" grid grid-cols-4 text-xs font-semibold md:text-sm ">
                                        <span>View</span> <span>Create</span> <span>Edit</span> <span>Delete</span>
                                    </div>
                                </div>
                                <div className="">
                                    {
                                        ModuleNames.map((moduleName, i) => (
                                            <div className={cn(`grid grid-cols-2 gap-2 space-y-2  border p-2 md:p-4`)} key={moduleName}>
                                                <div>
                                                    <span className="font-semibold">{moduleName}</span>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={form.watch(`Privilege.permissions.${i}.Read`)}
                                                            onCheckedChange={(checked) => form.setValue(`Privilege.permissions.${i}.Read`, checked as boolean)}
                                                        />
                                                    </FormControl>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={form.watch(`Privilege.permissions.${i}.Write`)}
                                                            onCheckedChange={(checked) => form.setValue(`Privilege.permissions.${i}.Write`, checked as boolean)}
                                                        />
                                                    </FormControl>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={form.watch(`Privilege.permissions.${i}.Update`)}
                                                            onCheckedChange={(checked) => form.setValue(`Privilege.permissions.${i}.Update`, checked as boolean)}
                                                        />
                                                    </FormControl>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={form.watch(`Privilege.permissions.${i}.Delete`)}
                                                            onCheckedChange={(checked) => form.setValue(`Privilege.permissions.${i}.Delete`, checked as boolean)}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </FormItem>
                    </>
                )}
            />

        </>
    )
};


const ModuleNames = [
    "Staff", "Remainder", "Maintenance"
]

