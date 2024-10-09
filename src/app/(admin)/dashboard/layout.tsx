import type { Metadata } from "next";
import { ReactNode } from "react";
import ScrollToTop from "~/common/components/scroll-to-top";
import { NavAdmin } from "~/modules/admin/components/nav-admin";

export const metadata: Metadata = {
  title: "NEST | Trang quản trị",
  description: "Trang quản trị, quản lý website của cửa hàng",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto min-h-screen flex bg-gray-100">
      <ScrollToTop>
        <div className="min-w-60 max-w-60 fixed top-0">
          <NavAdmin />
        </div>
        <div className="p-4 w-full ml-60">{children}</div>
      </ScrollToTop>
    </main>
  );
}
