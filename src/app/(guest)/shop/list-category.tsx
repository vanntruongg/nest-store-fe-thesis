"use client";
import { buttonVariants } from "../../../common/components/ui/button";
import { cn } from "~/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "~/common/components/ui/skeleton";
import RecursionCategory from "./recursion-category";
import { useEffect, useState } from "react";
import categoryApi from "~/apis/category-api";
import { Category } from "~/modules/product/models/Category";

const ListCategory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await categoryApi.getAll();
      setCategories(result.payload.data);
    };
    fetchData();
  }, []);

  const handleFetchData = (categoryId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNo", "1");
    params.set("category", categoryId.toString());
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className={cn("bg-white col-span-1")}>
      {categories.length > 0 ? (
        <div
          onClick={() => handleFetchData(0)}
          className={cn(
            buttonVariants({
              variant: "link",
              className: cn(
                "px-2 py-0 w-full flex justify-start items-center gap-2 text-gray-700 text-base cursor-pointer",
                {
                  "text-primary": Number(searchParams.get("category")) === 0,
                }
              ),
            })
          )}
        >
          <p>Tất cả</p>
        </div>
      ) : (
        <div className="p-2">
          <Skeleton className="w-full h-8 bg-gray-200" />
        </div>
      )}
      <RecursionCategory
        handleFetchData={handleFetchData}
        categories={categories}
        fontSize={17}
      />
    </div>
  );
};

export default ListCategory;
