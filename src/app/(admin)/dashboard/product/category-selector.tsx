import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  ProductShemaCreateType,
  ProductShemaUpdateType,
} from "~/app/schema-validations/product.shema";
import { BaseUtil } from "~/common/utility/base.util";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Category } from "~/modules/product/models/Category";
import { CategoryInProduct } from "~/modules/product/models/Product";
import { getAllCategory } from "~/modules/product/services/CategoryApi";

export interface Props {
  category?: CategoryInProduct;
  form: any;
}

interface SelectedCategoryPath {
  categorySelected: string[];
  isLastLevel: boolean;
}

export function CategorySelector({ category, form }: Props) {
  const {
    formState: { errors },
  } = form;
  const [categories, setCategories] = useState<Category[]>([]);
  // lưu categories trước khi chọn, để sử dụng chức năng quay lại
  const [historyCategories, setHistoryCategories] = useState<Category[][]>([]);
  // state hiển thị category đang chọn
  const [selectedCategoriesPath, setSelectedCategoriesPath] =
    useState<SelectedCategoryPath>({
      categorySelected: [],
      isLastLevel: false,
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCategory();
        setCategories(result.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, []);

  const handleSelectSubCategory = (
    e: any,
    categoryWithSubCategory: Category
  ) => {
    e.preventDefault();

    const {
      category: { id, name },
      subCategories,
    } = categoryWithSubCategory;

    if (subCategories && subCategories.length > 0) {
      // nếu có danh sách category con, thì set category con vào ds hiển thị
      // lưu lại lịch sử để quay lại
      setCategories(subCategories);
      setHistoryCategories((prev) => [...prev, categories]);

      // set category đang chọn vào ds
      setSelectedCategoriesPath((prev) => {
        let newPath = [...prev.categorySelected, name];
        let isLastLevel =
          subCategories.some((c) => c.category.id === category?.id) || false;

        if (category && isLastLevel) {
          newPath.push(category.name);
        }
        return {
          categorySelected: newPath,
          isLastLevel,
        };
      });
    } else {
      // nếu đang là cấp cuối thì thay thế category đang chọn
      if (selectedCategoriesPath.isLastLevel) {
        setSelectedCategoriesPath((prev) => {
          const newPath = [...prev.categorySelected];
          newPath[newPath.length - 1] = name;
          return {
            categorySelected: newPath,
            isLastLevel: true,
          };
        });
      } else {
        // chưa cuối thì set vào
        setSelectedCategoriesPath((prev) => {
          return {
            categorySelected: [...prev.categorySelected, name],
            isLastLevel: true,
          };
        });
      }
      form.setValue("category", { id, name });
      form.clearErrors("category");
    }
  };

  const handleBackCategory = () => {
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

      if (category) {
        // nếu có category (update product) thì set lại category khi back lại
        form.setValue("category", { id: category.id, name: category.name });
      } else {
        form.setValue("category", { id: 0, name: "" });
      }
    }
  };

  return (
    <div className="p-4 bg-white space-y-4 border rounded-sm overflow-hidden">
      <div
        className={cn(
          "flex items-center space-x-6 min-h-full transition-all duration-300",
          {
            "-translate-x-20": historyCategories.length === 0,
          }
        )}
      >
        <Button
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            handleBackCategory();
          }}
          disabled={historyCategories.length === 0}
          className={cn("transition-all duration-300", {
            "invisible opacity-0 -translate-x-4":
              historyCategories.length === 0,
          })}
        >
          <ChevronLeft />
        </Button>
        <div className="flex space-x-4 text-nowrap">
          {categories.map((category) => {
            const {
              category: { id, name, image },
            } = category;
            return (
              <div
                key={id}
                className={cn(
                  "p-2 flex items-center space-x-2 border rounded-md cursor-pointer hover:bg-gray-50",
                  {
                    "border-primary text-primary":
                      form.watch("category").id === id,
                  }
                )}
                onClick={(e) => handleSelectSubCategory(e, category)}
              >
                <div className="aspect-square h-8 rounded-sm">
                  <Image
                    src={image || "/assets/product-default.jpg"}
                    alt={`category-${id}`}
                    width={50}
                    height={50}
                  />
                </div>
                <p className="text-sm">{name}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Separator /> */}
      <div className="">
        {errors.category && errors.category.id && (
          <span className="text-red-500 text-sm">
            {errors.category.id.message}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        {/* <Input
          value={selectedCategoriesPath.map((category) => category).join(" > ")}
        /> */}
        <div className="px-3 w-full h-10 flex items-center text-sm space-x-2 border rounded-md select-none opacity-80">
          {selectedCategoriesPath.categorySelected.map((category, index) => (
            <Fragment key={category}>
              <p
                className={cn("", {
                  "text-primary":
                    selectedCategoriesPath.isLastLevel &&
                    selectedCategoriesPath.categorySelected.length - 1 ===
                      index,
                })}
              >
                {category}
              </p>
              {index < selectedCategoriesPath.categorySelected.length - 1 && (
                <ChevronRight size={16} />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
