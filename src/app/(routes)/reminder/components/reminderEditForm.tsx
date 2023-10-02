"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { User, remainderStatus } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Select as SingleSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { env } from "@/env.mjs";
import { format } from "date-fns";

export const RemainderformSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().max(300).optional(),
    duedate: z.string(),
    status: z.nativeEnum(remainderStatus),
    tags: z.array(z.object({
        userId: z.string()
    }))
})


const animatedComponents = makeAnimated();

const RemainderEditForm = ({ data }: { data: z.infer<typeof RemainderformSchema> }) => {

    const params = useParams();
    const router = useRouter();

    const [isloading, setisLoading] = useState(false);
    const [isFetching, setisFetching] = useState(false);
    const [staffs, setStaffs] = useState<User[] | null>(null);

    const form = useForm<z.infer<typeof RemainderformSchema>>({
        resolver: zodResolver(RemainderformSchema),
        defaultValues: {
            title: data.title,
            description: data.description || "",
            duedate: format(new Date(data.duedate), "yyyy-MM-dd"),
            status: data.status,
            tags: data.tags
        }
    })

    async function onSubmit(values: z.infer<typeof RemainderformSchema>) {
        setisLoading(true)

        try {
            const resp = await axios.patch(
                `${env.NEXT_PUBLIC_APP_URL}/api/reminder/${params.reminderId}`,
                {
                    ...values
                }
            )

            router.refresh();
            router.push(`/reminder`);

            toast.success("reminder Updated SuccessFully", {
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
        async function getStaffs() {
            try {
                setisFetching(true)
                const resp = await axios.get<User[]>(`/api/staff`);
                const data = resp.data;
                setStaffs(data);

            } catch (error) {
                toast.error(`something gone wrong! unable to fetch the staff `)
            } finally {
                setisFetching(false)
            }
        }
        getStaffs()
    }, [params.Institutionslug])

    function getStaff(staffId: string) {
        if (!staffs) {
            return null
        }
        for (const staff of staffs) {
            if (staff.id === staffId) {
                return { value: staff.id, label: staff.name }
            }
        }
        return null
    }

    return <div className="h-full">
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
                                    disabled={isloading} placeholder="Title" {...field} />
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
                                <Textarea disabled={isloading} placeholder="description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duedate"
                    render={({ field }) => (
                        <FormItem className="grid  gap-1 ">
                            <FormLabel>Due date<span className="text-red-700">*</span></FormLabel>
                            <FormDescription className="text-xs">the day by which something must be done, paid, etc.</FormDescription>
                            <FormControl>
                                <Input type="date" disabled={isloading} placeholder="duedate" {...field} />
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
                            <FormDescription className="text-xs">current status of remainder</FormDescription>

                            <SingleSelect onValueChange={field.onChange} defaultValue={"PENDING"}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="PENDING">PENDING</SelectItem>
                                    <SelectItem value="INPROGRESS">INPROGRESS</SelectItem>
                                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                                    <SelectItem value="EXPIRED">EXPIRED</SelectItem>
                                </SelectContent>
                            </SingleSelect>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem className="grid  gap-1">
                            <FormLabel>staffs</FormLabel>
                            <FormDescription className="text-xs">select staffs who you want to notify or who can see this remainder.</FormDescription>
                            <FormControl>
                                <Select
                                    isClearable={true}
                                    isDisabled={isloading || isFetching}
                                    isLoading={isloading || isFetching}
                                    components={animatedComponents}
                                    isMulti
                                    value={form.watch("tags")?.map(value => (
                                        getStaff(value.userId)
                                    ))}
                                    onChange={(value: any) => {
                                        form.setValue("tags", value.map((v: { value: any; }) => ({ userId: v.value })))
                                    }
                                    }
                                    options={staffs ? staffs.map(staff => (
                                        { value: staff.id, label: staff.name }
                                    )) : []}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="col-span-full">
                    <Button type="submit" disabled={isloading} size={"lg"} className="my-4">
                        {isloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit
                    </Button>
                </div>
            </form>
        </Form>

    </div>
};

export default RemainderEditForm;
