"use client";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";
import { BaseUtil } from "~/common/utility/base.util";
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
import { toast } from "~/components/ui/use-toast";
import { deleteUser } from "~/modules/user/services/UserService";

interface IConfirmDeleteProps {
  email: string;
  deleteUser: (email: string) => void;
}

export function ConfirmDelete({ email, deleteUser }: IConfirmDeleteProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleDeleteUser = async () => {
    deleteUser(email);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        asChild
        className="p-1.5 rounded-sm hover:bg-gray-100"
      >
        <div
          className="w-full text-sm cursor-pointer hover:text-red-500"
          onClick={() => setOpen(true)}
        >
          Xóa
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[525px]"
      >
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex">
            Xóa tài khoản người dùng
            <ShieldAlert className="size-5 text-yellow-500" />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteUser}>
            Xác nhận xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
