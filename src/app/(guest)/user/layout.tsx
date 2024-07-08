import type { Metadata } from "next";
import { ReactNode } from "react";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import NavProfile from "~/app/(guest)/user/nav-profile";

export const metadata: Metadata = {
  title: "NEST Store | Tài khoản của bạn",
  description: "Quản lý tài khoản ",
};

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="my-6 flex pt-8 gap-4 items-stretch ">
      <div className=" min-w-72 min-h-full">
        <NavProfile />
      </div>
      <div className=" w-full">{children}</div>
    </MaxWidthWrapper>
  );
}
