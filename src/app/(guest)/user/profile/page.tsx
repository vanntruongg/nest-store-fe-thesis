"use client";
import { Check, Mail, Phone, User } from "lucide-react";
import { useUser } from "~/hooks/useUser";
import { FormUpdateUser } from "./form-update";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { displayUserStatus } from "~/utils/displayUserStatus";
import { BaseUtil } from "~/common/utility/base.util";

const Profile = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-white rounded-sm relative overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-sm uppercase font-semibold">Thông tin cá nhân</h1>
        <FormUpdateUser />
      </div>

      {/* infor */}
      {!isMounted ? (
        <InforPlaceHolder />
      ) : (
        <div className="flex flex-col gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="size-5" />
            <div className="font-semibold">Họ:</div>
            <div>{user.lastName}</div>
          </div>
          <div className="flex items-center gap-2">
            <User className="size-5" />
            <div className="font-semibold">Tên:</div>
            <div>{user.firstName}</div>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-5" />
            <div className="font-semibold">Trạng thái:</div>
            <div>{displayUserStatus(user.status)}</div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-5" />
            <div className="font-semibold">Số điện thoại:</div>
            <div>{BaseUtil.formatPhoneNumber(user.phone || "")}</div>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="size-5" />
            <div className="font-semibold">Email:</div>
            <div>{user.email}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

const InforPlaceHolder = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-[400px] h-[24px] rounded-full" />
      <Skeleton className="w-[400px] h-[24px] rounded-full" />
      <Skeleton className="w-[400px] h-[24px] rounded-full" />
      <Skeleton className="w-[400px] h-[24px] rounded-full" />
      <Skeleton className="w-[400px] h-[24px] rounded-full" />
      <Skeleton className="w-[400px] h-[24px] rounded-full" />
    </div>
  );
};
