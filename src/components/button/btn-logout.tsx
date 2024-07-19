"use client";

import authApi from "~/apis/auth-api";
import { useRouter } from "next/navigation";
import { BaseUtil } from "~/common/utility/base.util";
import { LogOut } from "lucide-react";
import { useUser } from "~/hooks/useUser";
import { cn } from "~/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { ROUTES } from "~/common/constants/routes";

export default function ButtonLogout({ className }: { className?: string }) {
  const router = useRouter();
  const { clearUser } = useUser();

  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToNextServer();
      clearUser();
      tokenStorage.clearToken();
      router.push(ROUTES.AUTH.LOGIN);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className={cn("cursor-pointer", className)}>
          <LogOut className="size-5" />
          <p>Đăng xuất</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắn chắn muốn đăng xuất?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
