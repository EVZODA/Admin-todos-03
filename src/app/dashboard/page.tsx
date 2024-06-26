import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        redirect('/api/auth/signin')
    }

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">

            <WidgetItem title="Usuario conectado">
                <div className="flex flex-col">
                {session.user.name}
                </div>
            </WidgetItem>



        </div>
    );
}