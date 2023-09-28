"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

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
import { env } from "@/env.mjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const formSchema = z.object({
    name: z.string().min(2).max(50),
})

const NewCategoryForm = () => {

    const params = useParams();
    const router = useRouter();

    const [isloading, setisLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setisLoading(true)

        try {
            const resp = await axios.post(
                `${env.NEXT_PUBLIC_APP_URL}/api/maintenance/category`,
                {
                    ...values
                }
            )

            router.refresh();
            setOpen(false)

            toast.success("category Added SuccessFully", {
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

    return <>
        <div className="h-full">
            <Button onClick={() => setOpen(true)}>
                <Plus className="h4 mr-2 w-4 " /> Create Category
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Category</DialogTitle>
                        <DialogDescription>
                            Create Maintenance Category
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 grid w-full grid-cols-1 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
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
                            <div className="col-span-full">
                                <Button type="submit" disabled={isloading} size={"lg"} className="my-4">
                                    {isloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>



        </div>
    </>
};

export default NewCategoryForm;
