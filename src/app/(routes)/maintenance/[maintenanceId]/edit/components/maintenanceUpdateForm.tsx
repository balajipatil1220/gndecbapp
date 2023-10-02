"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { MaintenanceCategory, MaintenanceStatus, MaintenanceType } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import Select from 'react-select';
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env.mjs";

const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().max(300).optional(),
    MaintenanceType: z.nativeEnum(MaintenanceType),
    categoryID: z.string(),
    status: z.nativeEnum(MaintenanceStatus)
})

const MaintenanceUpdateForm = ({ data }: { data: z.infer<typeof formSchema> }) => {

    const params = useParams();
    const router = useRouter();

    const [isloading, setisLoading] = useState(false);
    const [isFetching, setisFetching] = useState(false);
    const [category, setCategory] = useState<MaintenanceCategory[] | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            description: data.description,
            MaintenanceType: data.MaintenanceType,
            categoryID: data.categoryID,
            status: data.status
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setisLoading(true)

        try {
            const resp = await axios.patch(
                `${env.NEXT_PUBLIC_APP_URL}/api/maintenance/${params.maintenanceId}`,
                {
                    ...values
                }
            )

            router.refresh();
            router.push(`/maintenance/${params.maintenanceId}`);

            toast.success("maintenance Updated SuccessFully", {
                duration: 2000,
            })

        } catch (error) {
            toast.error("Something gone wrong", {
                duration: 2000,
            })
        } finally {
            setisLoading(false)

        }
        console.log(values)
    }


    useEffect(() => {
        async function getCategory() {
            try {
                setisFetching(true)
                const resp = await axios.get<MaintenanceCategory[]>(`/api/maintenance/category`);
                const data = resp.data;
                setCategory(data);

            } catch (error) {
                toast.error(`something gone wrong! unable to fetch the staff `)
            } finally {
                setisFetching(false)
            }
        }
        getCategory()
    }, [params.Institutionslug])

    function getCategory(categoryId: string) {
        if (!category) {
            return null
        }
        for (const cat of category) {
            if (cat.id === categoryId) {
                return { value: cat.id, label: cat.name }
            }
        }
        return null
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="grid  gap-1">
                            <FormLabel>Title <span className="text-red-700">*</span></FormLabel>
                            <FormControl>
                                <Input type="Title"
                                    disabled={isloading || data.status == "COMPLETED" || data.status == "REJECTED"} placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="col-span-full  grid gap-1">
                            <FormLabel>Description <span className="text-red-700">*</span></FormLabel>
                            <FormControl>
                                <Textarea disabled={isloading || data.status == "COMPLETED" || data.status == "REJECTED"} placeholder="description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryID"
                    render={({ field }) => (
                        <FormItem className="grid  gap-1">
                            <FormLabel>Maintenance Category</FormLabel>
                            <FormControl>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={getCategory(form.watch("categoryID"))}
                                    isDisabled={isloading || data.status == "COMPLETED" || data.status == "REJECTED"}
                                    isLoading={isloading}
                                    isClearable={true}
                                    isSearchable={true}
                                    onChange={(value: any) => {
                                        form.setValue("categoryID", value.value)
                                    }}
                                    options={category?.map((c => ({
                                        label: c.name,
                                        value: c.id
                                    })))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="MaintenanceType"
                    render={({ field }) => (
                        <FormItem className="grid  gap-1">
                            <FormLabel>MaintenanceType</FormLabel>
                            <FormControl>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={{
                                        label: form.watch("MaintenanceType").toLocaleLowerCase(),
                                        value: form.watch("MaintenanceType")
                                    }}
                                    isDisabled={isloading || data.status == "COMPLETED" || data.status == "REJECTED"}
                                    isLoading={isloading}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={Object.values(MaintenanceType)?.map((c => ({
                                        label: c.toLocaleLowerCase(),
                                        value: c
                                    })))}
                                    onChange={(value: any) => {
                                        form.setValue("MaintenanceType", value.value)
                                    }
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="grid  gap-1">
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    value={{
                                        label: form.watch("status").toLocaleLowerCase(),
                                        value: form.watch("status")
                                    }}
                                    isDisabled={isloading || data.status == "COMPLETED" || data.status == "REJECTED"}
                                    isLoading={isloading}
                                    isClearable={true}
                                    isSearchable={true}
                                    options={Object.values(MaintenanceStatus)?.map((c => ({
                                        label: c.toLocaleLowerCase(),
                                        value: c
                                    })))}
                                    onChange={(value: any) => {
                                        form.setValue("status", value.value)
                                    }
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="col-span-full">
                    <Button type="submit" disabled={isloading || data.status == "COMPLETED" || data.status == "REJECTED"} size={"lg"} className="my-4">
                        {isloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                    </Button>
                </div>
            </form>
        </Form>

    </>
};

export default MaintenanceUpdateForm;
