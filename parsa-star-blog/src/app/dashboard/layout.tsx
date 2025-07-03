import { LazyConfirmDialog } from "@/components/common/LazyComponents/LazyDialogs";
import DashboardHeader from "@/components/dashboard/shared/dashboardHeader";
import { AppSidebar } from "@/components/dashboard/shared/dashboardSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full !font-roboto">
                <DashboardHeader />
                {children}
                <LazyConfirmDialog />
            </main>
        </SidebarProvider>
    );
}
