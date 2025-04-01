import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LecturerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check session on the server side
    const session = await getServerSession(authOptions);

    // Redirect to login if no session or incorrect role
    if (!session || !session.user || session.user.role !== "lecturer") {
        redirect("/auth/login");
    }

    // Return the children directly without additional containers
    // This lets the dashboard component handle its own layout
    return children;
}
