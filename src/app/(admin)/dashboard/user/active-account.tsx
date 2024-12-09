"use client";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";
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

interface Props {
  email: string;
  activeAccount: (email: string) => void;
}

export function AcctiveAccount({ email, activeAccount }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  console.log(open);

  const handleActive = () => {
    activeAccount(email);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="rounded-sm hover:bg-gray-100">
        <div
          className="w-full text-sm cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Kích hoạt tài khoản
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[525px]">
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex">
            Kích hoạt khoản người dùng
            <ShieldAlert className="size-5 text-blue-500" />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          {/* <AlertDialogAction onClick={handleActive}>Xác nhận</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
