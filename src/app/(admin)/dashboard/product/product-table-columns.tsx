import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { ProductUtil } from "~/common/utility/product.util";
import { FormUpdate } from "./form-update";

import { Product } from "~/modules/product/models/Product";
import { ProductPut } from "~/modules/product/models/ProductPut";

export function productTableColumns(
  updateProduct: (productPut: ProductPut) => any
): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: () => <div className="text-left">Sản phẩm</div>,
      cell: ({ row }) => {
        const { name, imageUrl } = row.original;
        return (
          <div className="flex items-center space-x-2 capitalize">
            <div className="relative aspect-square h-8 min-w-fit overflow-hidden rounded-full cursor-pointer">
              <Image
                src={imageUrl || "/assets/product-default.png"}
                alt={name}
                fill
                sizes="full"
                className="absolute object-cover"
              />
            </div>
            <div>{name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 w-full"
          >
            Giá
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {ProductUtil.formatPrice(row.getValue("price"))}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "stock",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         className="p-0 w-full"
    //       >
    //         Số lượng
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },
    //   cell: ({ row }) => {
    //     return <div className="text-center">{row.getValue("stock")}</div>;
    //   },
    // },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Danh mục
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { category } = row.original;
        return <div className="text-center capitalize">{category.name}</div>;
      },
    },
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
                <FormUpdate
                  product={row.original}
                  updateProduct={updateProduct}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
