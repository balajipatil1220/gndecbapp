import React, { useLayoutEffect, useState } from "react";
import * as z from "zod"
import { Edit2, Loader2 } from "lucide-react";
import { Gender } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useProfile } from "../hooks";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { env } from "@/env.mjs";
import toast from "react-hot-toast";

const formSchema = z.object({
    gender: z.nativeEnum(Gender),
    address: z.string().max(300),
})

const OtherInformations = () => {

    const params = useParams();
    const router = useRouter();

    const [isloading, setisLoading] = useState(false);

    const isOtherProfileDetailsEditing = useProfile((state) => state.isOtherProfileDetailsEditing)
    const setisOtherProfileDetailsEditing = useProfile((state) => state.setisOtherProfileDetailsEditing)

    const id = useProfile((state) => state.id)
    const gender = useProfile((state) => state.gender)
    const address = useProfile((state) => state.address)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "MALE",
            address: ""
        },
    })

    useLayoutEffect(() => {
        form.setValue("address", address)
        form.setValue("gender", gender as Gender)
    }, [address, form, gender]);


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        setisLoading(true)

        try {
            const resp = await axios.patch(
                `${env.NEXT_PUBLIC_APP_URL}/api/profile/${id}/otherdetails`,
                {
                    ...values,
                }
            )

            router.refresh();

            toast.success("profile updated SuccessFully", {
                duration: 2000,
            })
            setisOtherProfileDetailsEditing(false)
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

        <div className="professional-info-conatiner m-4 flex flex-col  justify-center">
            <div className="web-links-top flex items-center justify-between p-4">
                <h3 className="text-xl font-bold">
                    Profile Details
                </h3>
                {
                    !isOtherProfileDetailsEditing ? <Button disabled={isloading} variant={"outline"} onClick={() => setisOtherProfileDetailsEditing(true)}>
                        <Edit2 className="mr-2 h-4 w-4" />Edit
                    </Button> : <div className="space-x-2">
                        <Button disabled={isloading} onClick={() => onSubmit({ gender: form.watch("gender"), address: form.watch("address") })}>
                            {isloading && <Loader2 className="h-4 w-4 animate-spin" />}   Save
                        </Button>
                        <Button variant={"outline"} disabled={isloading} onClick={() => { setisOtherProfileDetailsEditing(false) }}>Cancel</Button>
                    </div>

                }
            </div>
            <div>
                <div className="col-span-full grid grid-cols-6 gap-4 px-4 lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="Gender" className="text-base">
                            Gender
                        </label>
                        <div className="mt-4 flex items-center justify-start space-x-1 rounded-md">
                            <Select disabled={!isOtherProfileDetailsEditing} value={form.watch("gender")} onValueChange={(value) => form.setValue("gender", value as Gender)}>
                                {/* <FormControl> */}
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                {/* </FormControl> */}
                                <SelectContent>
                                    <SelectItem value="MALE">Male</SelectItem>
                                    <SelectItem value="FEMALE">Female</SelectItem>
                                    <SelectItem value="OTHERS">Others</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label
                            htmlFor=" Address"
                            className="text-base"
                        >
                            Address
                        </label>
                        <div className="mt-4 flex items-center justify-start space-x-1 ">
                            <Input disabled={!isOtherProfileDetailsEditing}
                                value={form.watch("address")}
                                onChange={(e) => form.setValue("address", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
};

export default OtherInformations;
