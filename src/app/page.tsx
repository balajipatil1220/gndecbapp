import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const page = async () => {
    const user = await getCurrentUser()

    if (user) {
        redirect("/dashboard")
    } else {
        redirect("/login")
    }
};

export default page;
