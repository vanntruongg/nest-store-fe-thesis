import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { ProductUtil } from "~/common/utility/product.util";
import { FormUpdateProduct } from "./form-update-product";

import { Product } from "~/modules/product/models/Product";
import { ProductPut } from "~/modules/product/models/ProductPut";
import { SizeQuantity } from "~/modules/product/models/SizeQuantity";
import { FormUpdateInventory } from "./form-update-inventory";
import { InventoryPut } from "~/modules/product/models/InventoryPut";

export function productTableColumns(
  updateProduct: (productPut: ProductPut) => any,
  updateInventory: (inventoryPut: InventoryPut) => any
): ColumnDef<Product>[] {
  const columnNameAndImageProduct: ColumnDef<Product> = {
    accessorKey: "name",
    header: () => <div className="text-left">Sản phẩm</div>,
    cell: ({ row }) => {
      const { name, imageUrl } = row.original;
      return (
        <div className="flex items-center space-x-2 capitalize">
          <div className="relative aspect-square h-10 min-w-fit overflow-hidden rounded-full cursor-pointer">
            <Image
              src={imageUrl || "/assets/product-default.png"}
              alt={name}
              fill
              sizes="full"
              className="absolute object-cover"
            />
          </div>
          <p className="max-w-96">{name}</p>
        </div>
      );
    },
  };
  const columnsListProduct: ColumnDef<Product>[] = [
    columnNameAndImageProduct,
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
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center w-full"
          >
            Danh mục
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { category } = row.original;
        return (
          <div className="px-1 py-0.5 self-start bg-gray-200 text-xs text-center border rounded-sm">
            {category.name}
          </div>
        );
      },
    },
    {
      accessorKey: "sizeQuantity",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="p-0 w-full">
            PL/SL
          </Button>
        );
      },
      cell: ({ row }) => {
        const sizeQuantityList: SizeQuantity[] = row.getValue(
          "sizeQuantity"
        ) as SizeQuantity[];
        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <Button size={"sm"} variant={"outline"}>
                Chi tiết
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Phân loại - Số lượng</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sizeQuantityList.map(({ size, quantity }) => (
                <DropdownMenuItem disabled className="flex">
                  <span className="flex-1 text-center">{size}:</span>
                  <span className="flex-1 text-center">{quantity}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
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
                <FormUpdateProduct
                  product={row.original}
                  updateProduct={updateProduct}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <FormUpdateInventory
                  product={row.original}
                  updateInventory={updateInventory}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columnsListProduct;
}
