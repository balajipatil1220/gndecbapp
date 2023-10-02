"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2, RotateCw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ModuleName, Role } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ModuleNames, PrivilegeFormField } from "@/app/(routes)/staff/new/components/privilegeField";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { env } from "@/env.mjs";
import toast from "react-hot-toast";
import { PermissionType } from "@/lib/server-utils";
import Password from "@/app/(routes)/profile/components/password";

export const StaffformSchema = z.object({
    name: z.string().min(3, "minimum 3 chars required"),
    email: z.string().min(3, "minimum 3 chars required"),
    phonenumber: z.string().regex(/^\d{10,12}$/, "phone number is invalid"),
    address: z.string().min(3, "minimum 3 char required").max(100, "max 100 chars are allowed").optional(),
    role: z.enum(["ADMIN", "SUPERADMIN", "STAFF"]),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"]),
    Privilege: z.object({
        permissions: z.array(
            z.object({
                moduleName: z.nativeEnum(ModuleName),
                Read: z.boolean(),
                Write: z.boolean(),
                Update: z.boolean(),
                Delete: z.boolean(),
            })
        ),
    }),
})

const UpdateStaffForm = ({ data }: { data: z.infer<typeof StaffformSchema> }) => {

    const params = useParams();
    const router = useRouter();

    const [isloading, setisLoading] = useState(false);


    const form = useForm<z.infer<typeof StaffformSchema>>({
        resolver: zodResolver(StaffformSchema),
        defaultValues: {
            name: data.name,
            email: data.email,
            phonenumber: data.phonenumber,
            role: data.role,
            gender: data.gender,
            Privilege: data.Privilege
        },
    })

    async function onSubmit(values: z.infer<typeof StaffformSchema>) {
        console.log(values);

        setisLoading(true)

        try {
            const resp = await axios.patch(
                `${env.NEXT_PUBLIC_APP_URL}/api/staff/${params.staffId}`,
                {
                    ...values,
                    Privilege: {
                        permissions: values.Privilege.permissions
                    }
                }
            )

            router.refresh();
            router.push(`/staff`);

            toast.success("Staff updated SuccessFully", {
                duration: 2000,
            })
        } catch (error: any) {
            console.log(error);

            toast.error(`Something gone wrong: ${error.message}`, {
                duration: 2000,
            })
        } finally {
            setisLoading(false)

        }
    }


    function AutoSelectPrivilege(role: Role) {
        if (role == "ADMIN") {
            ModuleNames.forEach((mn, i) => {
                form.setValue(`Privilege.permissions.${i}.Read`, true)
                form.setValue(`Privilege.permissions.${i}.Write`, true)
                form.setValue(`Privilege.permissions.${i}.Update`, true)
                form.setValue(`Privilege.permissions.${i}.Delete`, true)
            })
        } else if (role == "SUPERADMIN") {
            ModuleNames.forEach((mn, i) => {
                form.setValue(`Privilege.permissions.${i}.Read`, true)
                form.setValue(`Privilege.permissions.${i}.Write`, true)
                form.setValue(`Privilege.permissions.${i}.Update`, true)
                form.setValue(`Privilege.permissions.${i}.Delete`, true)
            })
        } else {
            ModuleNames.forEach((mn, i) => {
                if (mn == "Maintenance") {
                    form.setValue(`Privilege.permissions.${i}.Read`, true)
                    form.setValue(`Privilege.permissions.${i}.Write`, true)
                    form.setValue(`Privilege.permissions.${i}.Update`, false)
                    form.setValue(`Privilege.permissions.${i}.Delete`, false)
                } else {
                    form.setValue(`Privilege.permissions.${i}.Read`, false)
                    form.setValue(`Privilege.permissions.${i}.Write`, false)
                    form.setValue(`Privilege.permissions.${i}.Update`, false)
                    form.setValue(`Privilege.permissions.${i}.Delete`, false)
                }
            })
        }
    }

    return < >
        <div className="container mt-6 flex h-full w-full max-w-[60rem] flex-col space-y-4 rounded-md border p-4 shadow-md">
            <div className="flex items-center justify-between">

                <div className="flex items-center">
                    <Button size={"sm"} onClick={() => router.back()} variant={"ghost"} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-2xl font-medium tracking-tight text-primary">Add Staff</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button size={"sm"} variant={"outline"} className="flex items-center">
                        <RotateCw className="mr-2 h-4 w-4" />  <span>Refresh</span>
                    </Button>

                </div>
            </div>
            <Separator />
            <div className={cn("grid gap-6 p-2",)}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err)
                    )} className="mt-2 w-full grid-cols-1 gap-2 space-y-2 md:grid md:grid-cols-2 md:gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="grid  gap-1">
                                    <FormLabel>Staff Name<span className="text-red-700"> *</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Name"
                                            type="text"
                                            disabled={isloading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="grid  gap-1">
                                    <FormLabel>Staff Email<span className="text-red-700"> *</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="Email"
                                            type="email"
                                            disabled={isloading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phonenumber"
                            render={({ field }) => (
                                <FormItem className="grid  gap-1">
                                    <FormLabel>Staff Phone Number<span className="text-red-700"> *</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            id="phonenumber"
                                            placeholder="Phone number"
                                            type="number"
                                            disabled={isloading}
                                            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="grid  gap-1">
                                    <FormLabel>Staff Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="address"
                                            placeholder="Address"
                                            type="text"
                                            disabled={isloading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Staff Roles<span className="text-red-700"> *</span></FormLabel>
                                    <Select onValueChange={(value: string) => {
                                        AutoSelectPrivilege(value as Role)
                                        field.onChange(value)
                                    }} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="STAFF">STAFF</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem disabled value="SUPERADMIN">Superadmin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="grid  gap-1">
                                    <FormLabel>Staff Gender<span className="text-red-700"> *</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
                                            <SelectItem value="OTHERS">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <PrivilegeFormField form={form} />


                        <div className="col-span-full space-x-4">
                            <Button type="submit" disabled={isloading} className="md:w-30 col-span-full">
                                {isloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update
                            </Button>
                            <Button type="reset" onClick={() => router.refresh()} disabled={isloading} className="col-span-full my-3  md:w-20">
                                {isloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Reset
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>

            <Password />

        </div>
    </>
};


export default UpdateStaffForm;
