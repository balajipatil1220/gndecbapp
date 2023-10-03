"use client"

import * as z from "zod"
import { Edit2, Loader2 } from "lucide-react";

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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProfile } from "../hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { env } from "@/env.mjs";
import toast from "react-hot-toast";



const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phoneNumber: z.string().max(12).min(10),
})


const ProfileDetails = () => {

    const params = useParams();
    const router = useRouter();

    const [isloading, setisLoading] = useState(false);

    const id = useProfile((state) => state.id)
    const name = useProfile((state) => state.name)
    const email = useProfile((state) => state.email)
    const phoneNumber = useProfile((state) => state.phoneNumber)

    const isProfileDetailsEditing = useProfile((state) => state.isProfileDetailsEditing)
    const setisProfileDetailsEditing = useProfile((state) => state.setisProfileDetailsEditing)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name,
            email,
            phoneNumber
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        setisLoading(true)

        try {
            const resp = await axios.patch(
                `${env.NEXT_PUBLIC_APP_URL}/api/profile/${id}`,
                {
                    ...values,
                }
            )

            router.refresh();

            toast.success("profile updated SuccessFully", {
                duration: 2000,
            })
            setisProfileDetailsEditing(false)
        } catch (error: any) {
            console.log(error);

            toast.error(`Something gone wrong: ${error.message}`, {
                duration: 2000,
            })
        } finally {
            setisLoading(false)
        }
    }

    useLayoutEffect(() => {
        form.setValue("name", name)
        form.setValue("email", email)
        form.setValue("phoneNumber", phoneNumber)
    }, [email, form, name, phoneNumber]);


    return <>

        <div className="pf-user-box h-28 w-full">
            <div className="pf-user-back">
                <div className="profile-conatiner flex h-full w-full items-center justify-start gap-4 bg-gradient-to-r via-transparent p-4">
                    <div className="profile-img">
                        <Avatar className="h-10 w-10 md:h-20 md:w-20">
                            <AvatarImage src="/avatars/03.png" />
                            <AvatarFallback className="bg-primary/80 text-white md:text-4xl">
                                {name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="profile-content flex flex-1 items-center justify-between">
                        <div className="user-details flex items-center">
                            <div>
                                <h1 className="text-sm font-semibold md:text-xl">
                                    {name}
                                </h1>
                                <h2 className="text-sm md:text-xl">{email}</h2>
                                <h2 className="text-sm md:text-xl">{phoneNumber}</h2>
                            </div>
                            <div className="ml-6">
                            </div>
                        </div>
                        <div className="">
                            {
                                !isProfileDetailsEditing ? <Button size={"sm"} disabled={isloading} variant={"outline"} onClick={() => setisProfileDetailsEditing(true)}>  <Edit2 className="mr-2 h-4 w-4" />Edit</Button> : <>
                                    <Button size={"sm"} disabled={isloading} onClick={() => setisProfileDetailsEditing(false)}>
                                        {isloading && <Loader2 className="h-4 w-4 animate-spin" />}  Save</Button>

                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Dialog open={isProfileDetailsEditing} onOpenChange={setisProfileDetailsEditing}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className={cn("grid gap-6 p-2",)}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, (err) => { console.log(err, form.watch("email")) }
                        )} className="mt-2 w-full grid-cols-1 gap-2 space-y-2 md:grid md:grid-cols-2 md:gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid  gap-1">
                                        <FormLabel>Name<span className="text-red-700"> *</span></FormLabel>
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
                                        <FormLabel>Email<span className="text-red-700"> *</span></FormLabel>
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
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="grid  gap-1">
                                        <FormLabel>Phone Number<span className="text-red-700"> *</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                id="phoneNumber"
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

export default ProfileDetails;
