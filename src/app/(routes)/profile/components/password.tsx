import React, { useState } from "react";
import { useProfile } from "../hooks";
import { Button } from "@/components/ui/button";
import { Edit2, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import axios from "axios";
import { env } from "@/env.mjs";
import toast from "react-hot-toast";

const formSchema = z.object({
    password: z
        .string()
        .min(4)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
    newpassword: z
        .string()
        .min(4)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
    confirmpassword: z
        .string()
        .min(4)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
})

const Password = () => {

    const params = useParams();
    const router = useRouter();

    const [isloading, setisLoading] = useState(false);


    const isPasswordEditing = useProfile((state) => state.isPasswordEditing)
    const setisPasswordEditing = useProfile((state) => state.setisPasswordEditing)
    const id = useProfile((state) => state.id)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        setisLoading(true)

        try {
            const resp = await axios.patch(
                `${env.NEXT_PUBLIC_APP_URL}/api/profile/${id}/changepassword`,
                {
                    ...values,
                }
            )

            form.setValue("password", "")
            form.setValue("newpassword", "")
            form.setValue("confirmpassword", "")

            router.refresh();

            toast.success("password updated SuccessFully", {
                duration: 2000,
            })
            setisPasswordEditing(false)
        } catch (error: any) {
            console.log(error);

            toast.error(`Something gone wrong: ${error.message}`, {
                duration: 2000,
            })
        } finally {
            setisLoading(false)
        }
    }



    return <>

        <div className="password-conatiner m-4 flex flex-col  justify-center">
            <div className="web-links-top flex items-center justify-between p-4">
                <h3 className="text-text-color2 text-xl font-bold">
                    PASSWORD & SECURITY
                </h3>

                {
                    !isPasswordEditing ? <Button variant={"outline"} onClick={() => setisPasswordEditing(true)}>  <Edit2 className="mr-2 h-4 w-4" />Edit</Button> : <><Button onClick={() => setisPasswordEditing(false)}>{isloading && <Loader2 className="h-4 w-4 animate-spin" />}    Save</Button>
                        <Button variant={"outline"} disabled={isloading} onClick={() => { setisPasswordEditing(false) }}>Cancel</Button>
                    </>
                }

            </div>
            <div>
                <div className="col-span-full grid grid-cols-6 gap-4 px-4 lg:col-span-3">
                    <div className="col-span-full">
                        <label
                            htmlFor="password"
                            className="text-base"
                        >
                            Password
                        </label>
                        <div className="mt-4 flex items-center justify-start space-x-1 rounded-md">
                            <Input
                                type="text"
                                disabled
                                placeholder="password"
                                className=" w-full rounded-md bg-background outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog open={isPasswordEditing} onOpenChange={setisPasswordEditing}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className={cn("grid gap-6 p-2",)}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, (err) => { console.log(err) }
                        )} className="mt-2 w-full grid-cols-1 gap-2 space-y-2 md:grid md:gap-6">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid  gap-1">
                                        <FormLabel>Password<span className="text-red-700"> *</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                id="password"
                                                placeholder="password"
                                                type="password"
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
                                name="newpassword"
                                render={({ field }) => (
                                    <FormItem className="grid  gap-1">
                                        <FormLabel>New Password<span className="text-red-700"> *</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                id="newpassword"
                                                placeholder="newpassword"
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
                                name="confirmpassword"
                                render={({ field }) => (
                                    <FormItem className="grid  gap-1">
                                        <FormLabel>Confirm Password<span className="text-red-700"> *</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                id="confirmpassword"
                                                placeholder="Confirm Password"
                                                type="text"
                                                disabled={isloading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-full space-x-4">
                                <Button type="submit" size={"lg"} disabled={isloading} className="md:w-30 col-span-full">
                                    {isloading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    save
                                </Button>
                            </div>

                        </form>
                    </Form>

                </div>
            </DialogContent>
        </Dialog>



    </>
};

export default Password;
