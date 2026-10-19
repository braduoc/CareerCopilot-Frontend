import { Sidebar } from "@/components/layout/sidebar";
import { AuthGuard } from "@/components/layout/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background text-foreground md:flex-row flex-col">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <main className="mx-auto w-full max-w-5xl px-6 py-8 md:px-10 md:py-10">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
