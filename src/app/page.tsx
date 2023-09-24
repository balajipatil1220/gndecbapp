import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const page = async () => {
    const user = await getCurrentUser()

    if (user) {
        console.log(user, "user is present auth");

        redirect("/dashboard")
    } else {
        redirect("/login")
    }
};

export default page;
