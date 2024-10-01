import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { cn } from "~/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { EUserStatus } from "~/common/utility/enum.util";
import { Button } from "~/components/ui/button";
import { User } from "~/modules/user/model/User";
import { ConfirmDelete } from "./dialog-confirm-delete";
import { FormUpdateUser } from "./form-update";
import { ViewUserDetail } from "./user-detail";
import { UserPut } from "~/modules/user/model/UserPut";
import { Role } from "~/modules/user/model/Role";

export function userTableColumns(
  updateUser: (userPut: UserPut) => void,
  deleteUser: (email: string) => void
): ColumnDef<User>[] {
  return [
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0"
          >
            Họ Tên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { lastName, firstName, imageUrl } = row.original;
        return (
          <div className="flex items-center space-x-2 capitalize">
            <div className="relative aspect-square h-8 min-w-fit overflow-hidden rounded-full cursor-pointer">
              <Image
                src={imageUrl || "/assets/avatar-default.png"}
                alt={`Avatar ${firstName}`}
                fill
                sizes="full"
                className="absolute object-cover"
              />
            </div>
            <div>
              {lastName} {firstName}
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "email",
      header: ({ column }) => {
        return <Button variant="ghost">Email</Button>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="text-center w-full">
            Phone
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">
          {row.getValue("phone") || "..."}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 w-full"
          >
            Trạng thái
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status: string = row.getValue("status");
        console.log(status);

        return (
          <div
            className={cn(
              "flex items-center justify-center gap-1 text-center text-xs font-bold capitalize p-1 rounded-full",
              {
                "text-green-500":
                  (EUserStatus as { [key: string]: string })[status] ===
                  EUserStatus.ACTIVE,
                "text-red-500":
                  (EUserStatus as { [key: string]: string })[status] ===
                  EUserStatus.DELETED,
                "text-yellow-500":
                  (EUserStatus as { [key: string]: string })[status] ===
                  EUserStatus.PENDING_VERIFICATION,
              }
            )}
          >
            <span
              className={cn("size-1.5 rounded-full", {
                " bg-green-500":
                  (EUserStatus as { [key: string]: string })[status] ==
                  EUserStatus.ACTIVE,
                " bg-red-500":
                  (EUserStatus as { [key: string]: string })[status] ==
                  EUserStatus.DELETED,
                " bg-yellow-500":
                  (EUserStatus as { [key: string]: string })[status] ==
                  EUserStatus.PENDING_VERIFICATION,
              })}
            ></span>
            {(EUserStatus as { [key: string]: string })[status]}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "roles",
    //   header: () => <div className="text-right">Phân quyền</div>,
    //   cell: ({ row }) => {
    //     const roles: Role[] = row.getValue("roles");

    //     return (
    //       <div className="text-right font-medium">
    //         {roles.map((role, idx) => {
    //           return (
    //             <div key={idx} className="">
    //               {/* {(ERole as { [key: string]: string })[role]} */}
    //               {role.name}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     );
    //   },
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <ViewUserDetail user={row.original} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <FormUpdateUser user={row.original} updateUser={updateUser} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ConfirmDelete
                  email={row.original.email}
                  deleteUser={deleteUser}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
