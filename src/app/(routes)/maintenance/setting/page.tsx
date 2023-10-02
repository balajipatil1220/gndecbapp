import React from "react";


import { ChevronDownIcon } from "@radix-ui/react-icons"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { db } from "@/lib/db";
import Link from "next/link";
import { cn } from "@/lib/utils";


async function getData() {
    try {

        const users = await db.user.findMany({
            where: {
                OR: [
                    {
                        role: "ADMIN",
                    },
                    {
                        role: "SUPERADMIN",
                    },
                ],
            },
        })

        console.log(users);

        return users
    } catch (error: any) {
        throw new Error(`[Maintenance server PAGE] Error retrieving user data: ${error.message}`);
    }
}

const Settingspage = async () => {

    const data = (await getData()).map(u => ({ name: u.name, email: u.email, phonenumber: u.phonenumber, id: u.id, role: u.role }));
    return <>

        <Card className="max-w-md">
            <CardHeader>
                <CardTitle>Staffs</CardTitle>
                <CardDescription>
                    Staffs Who Can View and Update All the Maintenances.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                {data.map((u) => (
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/01.png" alt="Image" />
                                <AvatarFallback>{u.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">{u.name}</p>
                                <p className="text-sm text-muted-foreground">{u.phonenumber}</p>
                                {/* <p className="text-sm text-muted-foreground">{u.email}</p> */}
                            </div>
                        </div>
                        {
                            u.role != "SUPERADMIN" ? <Link href={`/staff/${u.id}/edit`} className={cn(buttonVariants({ variant: "outline" }))}>
                                Remove
                            </Link>
                                : <Button variant={"outline"} disabled={u.role === "SUPERADMIN"}>Remove</Button>

                        }
                    </div>
                ))
                }
                <p className="text-sm text-muted-foreground"> Rest Staff can only view there requested Maintenances.</p>

            </CardContent>
        </Card>

    </>
};

export default Settingspage;
