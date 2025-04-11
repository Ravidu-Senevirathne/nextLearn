import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function StudentDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check session on the server side
    const session = await getServerSession(authOptions);

    // Redirect to login if no session or incorrect role
    if (!session || !session.user || session.user.role !== "student") {
        redirect("/auth/login");
    }

    // Return children directly without wrapper divs that create extra scrollable containers
    return children;
}
