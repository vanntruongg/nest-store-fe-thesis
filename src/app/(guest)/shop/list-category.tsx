"use client";
import { ICategory } from "~/common/model/product.model";
import { buttonVariants } from "../../../components/ui/button";
import { cn } from "~/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "~/components/ui/skeleton";
import RecursionCategory from "./recursion-category";
import { useEffect, useState } from "react";
import productApi from "~/apis/product-api";

const ListCategory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getCategory();
      const data: ICategory[] = result.payload.data;

      const sortedCategories = data.sort(
        (category1, category2) => category1.category.id - category2.category.id
      );
      setCategories(sortedCategories);
    };
    fetchData();
  }, []);

  const handleFetchData = (categoryId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", "1");
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

const Placeholder = () => {
  return (
    <div className="w-full p-2 space-y-4">
      <Skeleton className=" w-full h-8 bg-gray-200" />
      <Skeleton className=" w-full h-8 bg-gray-200" />
      <Skeleton className=" w-full h-8 bg-gray-200" />
    </div>
  );
};
