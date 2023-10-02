"use client"

import { Role } from "@prisma/client";
import ProfileDetails from "./profileDetails";
import { useProfile } from "../hooks";
import { useLayoutEffect } from "react";
import { Separator } from "@/components/ui/separator";
import OtherInformations from "./otherInformations";
import Password from "./password";

interface user {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    gender: string;
    role: Role;
    address: string
}

const Profile = ({ user }: { user: user }) => {

    const setProfile = useProfile((state) => state.setProfile)

    useLayoutEffect(() => {
        setProfile(user)
    }, [setProfile, user])


    return <>
        <div className="pf-container m-2 rounded-sm border md:m-0">
            <ProfileDetails />

            <Separator className="border-1" />

            <OtherInformations />

            <Separator className="border-1" />

            <Password />

            {/* <AboutMe />

            <div className="bg-border-color rounded-md h-[1px] mx-4 my-2 w-full" />

            <WebLinks />

            <div className="bg-border-color rounded-md h-[1px] mx-4 mt-10 mb-6 w-full" />
            <ProfessionalInfo />
            <div className="bg-border-color rounded-md h-[1px] mx-4 mt-10 mb-6 w-full" />

            <Password />

            <div className="bg-border-color rounded-md h-[1px] mx-4 mt-10 mb-6 w-full" />

            <Intrsest /> */}
        </div>

    </>
};

export default Profile;
