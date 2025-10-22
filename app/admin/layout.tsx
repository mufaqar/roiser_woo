import { cookies } from "next/headers";
import PasscodeProtection from "@/components/admin/PasscodeProtection";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/passcode";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Vitahomedecor",
  description: "Admin - Vitahomedecor",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(ADMIN_COOKIE_NAME)?.value === "1";

  if (!isAuthenticated) {
    return <PasscodeProtection />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
