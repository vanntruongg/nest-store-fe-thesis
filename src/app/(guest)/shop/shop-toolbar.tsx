import MaxWidthWrapper from "~/components/max-width-wrapper";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { LayoutGrid, LayoutList } from "lucide-react";
import TooltipCustom from "~/components/tooltip-custom";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { cn } from "~/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface IShopToolBarProps {
  offset: number;
  totalElements: number;
  layout: ELayoutProduct;
  setLayout: Dispatch<SetStateAction<ELayoutProduct>>;
}
export function ShopToolBar({
  offset,
  totalElements,
  layout,
  setLayout,
}: IShopToolBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const pageSize = Number(searchParams.get("pageSize")) || 12;
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    // setSort(value);
    // setData((prevData) => ({ ...prevData, pageNumber: 1 }));

    params.set("order", value);
    params.set("sortBy", "price");
    router.push(pathname + "?" + params.toString());
  };

  const handlePageSize = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    // setSort(value);
    // setData((prevData) => ({ ...prevData, pageNumber: 1 }));

    params.set("pageSize", value);
    params.set("pageNumber", "1");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <MaxWidthWrapper>
      <div className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2 flex-1">
          <span>Hiển thị </span>
          <Select onValueChange={handlePageSize}>
            <SelectTrigger className="max-w-20">
              <SelectValue placeholder="8" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="16">16</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <span>
            {offset + 1} -{" "}
            {offset + pageSize > totalElements
              ? totalElements
              : offset + pageSize}{" "}
            trên {totalElements} sản phẩm
          </span>
        </div>
        <div className="flex flex-1 space-x-8">
          {/* Layout toggle */}
          <div className="w-full flex gap-2 justify-end">
            <TooltipCustom content={ELayoutProduct.GRID}>
              <LayoutGrid
                strokeWidth={2}
                className={cn("size-5 text-gray-400 hover:text-primary", {
                  "text-primary": layout === ELayoutProduct.GRID,
                })}
                onClick={() => setLayout(ELayoutProduct.GRID)}
              />
            </TooltipCustom>
            <TooltipCustom content={ELayoutProduct.LIST}>
              <LayoutList
                strokeWidth={2}
                className={cn("size-5 text-gray-400 hover:text-primary", {
                  "text-primary": layout === ELayoutProduct.LIST,
                })}
                onClick={() => setLayout(ELayoutProduct.LIST)}
              />
            </TooltipCustom>
          </div>
          {/* Sort select */}
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="asc">Giá: Thấp đến Cao</SelectItem>
                <SelectItem value="desc">Giá: Cao đến Thấp</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
