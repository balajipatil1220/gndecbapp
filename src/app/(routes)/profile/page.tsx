import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import Profile from "./components/profile";

async function getData(userId: string) {
    try {

        return await db.user.findFirstOrThrow({
            where: {
                id: userId
            }
        })

    } catch (error: any) {
        throw new Error(`[STAFF server PAGE] Error retrieving user data: ${error.message}`);
    }

}

const Profilepage = async () => {

    const user = await getCurrentUser()

    if (!user) {
        redirect("/")
    }

    const userData = await getData(user.id)


    return <>
        <Profile user={{ id: userData.id, name: userData.name, email: userData.email, phoneNumber: userData.phonenumber, gender: userData.gender || "", role: userData.role, address: userData.address || "" }} />
    </>
};

export default Profilepage;
