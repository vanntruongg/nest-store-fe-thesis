import type { Metadata } from "next";
import { ReactNode } from "react";
import { NavAdmin } from "~/modules/admin/components/nav-admin";

export const metadata: Metadata = {
  title: "NEST | Trang quản trị",
  description: "Trang quản trị, quản lý website của cửa hàng",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className=" min-h-screen flex bg-gray-100">
      <div style={{ width: "20%" }} className="fixed top-0">
        <NavAdmin />
      </div>
      <div style={{ width: "80%" }} className="p-4 ml-[20%]">
        {children}
      </div>
    </main>
  );
}
