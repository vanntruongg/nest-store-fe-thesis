"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Category, CategoryPut } from "~/modules/product/models/Category";
import {
  getAllCategory,
  updateCategory,
} from "~/modules/product/services/CategoryService";
import { ROUTES } from "~/common/constants/routes";
import { UpdateCategoryDialog } from "./update-category-dialog";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronLeft } from "lucide-react";
import { updateAddress } from "~/modules/user/services/UserAddressService";
import { toast } from "~/components/ui/use-toast";
import { BaseUtil } from "~/common/utility/base.util";

interface SelectedCategoryPath {
  categorySelected: string[];
  isLastLevel: boolean;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  // lưu categories trước khi chọn, để sử dụng chức năng quay lại
  const [historyCategories, setHistoryCategories] = useState<Category[][]>([]);
  const [selectedCategoriesPath, setSelectedCategoriesPath] =
    useState<SelectedCategoryPath>({
      categorySelected: [],
      isLastLevel: false,
    });
  const fetchCategories = async () => {
    const res = await getAllCategory();
    setCategories(res.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUpdate = async (categoryPut: CategoryPut) => {
    try {
      const res = await updateCategory(categoryPut);
      toast({ description: res.message });
      await fetchCategories();
      setSelectedCategoriesPath({ categorySelected: [], isLastLevel: false });
      setHistoryCategories([]);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  const handleSelectCategory = (e: any, category: Category) => {
    const {
      category: { id, name },
      subCategories,
    } = category;
    if (subCategories && subCategories.length > 0) {
      setCategories(subCategories);
      setHistoryCategories((prev) => [...prev, categories]);

      setSelectedCategoriesPath((prev) => {
        let newPath = [...prev.categorySelected, name];
        let isLastLevel =
          subCategories.some((c) => c.category.id === id) || false;

        if (category && isLastLevel) {
          newPath.push(name);
        }
        return {
          categorySelected: newPath,
          isLastLevel,
        };
      });
    }
  };

  const handleBackCategory = (e: any) => {
    if (historyCategories.length === 0) return;

    const previousCategories = historyCategories.pop();

    if (previousCategories) {
      setCategories(previousCategories);
      setHistoryCategories(historyCategories);

      setSelectedCategoriesPath((prev) => {
        const newPath = [...prev.categorySelected];
        if (selectedCategoriesPath.isLastLevel) {
          newPath.pop();
          newPath.pop();
        } else {
          newPath.pop();
        }
        return {
          categorySelected: newPath,
          isLastLevel: false,
        };
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Danh mục sản phẩm</h2>
        <Link
          href={ROUTES.ADMIN.CATEGORY_CREATE}
          className="px-4 py-1.5 text-white text-sm font-medium border rounded-full bg-gradient-to-br from-purple-700 to-purple-500 hover:opacity-90"
        >
          Thêm danh mục
        </Link>
      </div>
      <div className="flex space-x-4">
        <Button
          variant={"outline"}
          onClick={handleBackCategory}
          disabled={historyCategories.length === 0}
          className={cn("transition-all duration-300", {
            "invisible opacity-0 -translate-x-4":
              historyCategories.length === 0,
          })}
        >
          <ChevronLeft />
        </Button>
        <div
          className={cn(
            "flex-1 grid grid-cols-5  gap-4 transition-all duration-300",
            {
              "-translate-x-[72px]": historyCategories.length === 0,
            }
          )}
        >
          {categories.map((category) => (
            <div
              key={category.category.id}
              className={cn(
                "p-4 flex flex-col items-center space-y-4  bg-white border rounded-md group",
                {
                  "cursor-pointer": category.subCategories.length > 0,
                }
              )}
            >
              <div
                className="aspect-square relative w-full overflow-hidden"
                onClick={(e) => handleSelectCategory(e, category)}
              >
                <Image
                  alt={`category`}
                  src={category.category.image || "/assets/product-default.jpg"}
                  sizes="full"
                  fill
                  className={cn(
                    "size-full absolute object-cover transition-all duration-300",
                    {
                      "group-hover:scale-110":
                        category.subCategories.length > 0,
                    }
                  )}
                />
              </div>
              <div
                className="text-center text-lg flex justify-between items-center"
                onClick={(e) => handleSelectCategory(e, category)}
              >
                {category.category.name}
              </div>
              <UpdateCategoryDialog
                handleUpdate={handleUpdate}
                category={category.category}
                categorySelected={selectedCategoriesPath.categorySelected}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
