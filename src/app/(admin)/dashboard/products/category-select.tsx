import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import productApi from "~/apis/product-api";
import { BaseUtil } from "~/common/utility/base.util";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { Category } from "~/modules/product/models/Category";
import categoryApi from "~/apis/category-api";

export interface Props {
  category?: Category;
  setValue: any;
}

export function CategorySelect({ category, setValue }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  // lưu categories trước khi chọn, để sử dụng chức năng quay lại
  const [historyCategories, setHistoryCategories] = useState<Category[][]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await categoryApi.getAll();
        setCategories(result.payload.data);
        // console.log(result.payload.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, []);

  const handleSelectSubCategory = (
    e: any,
    categoryId: number,
    categoryName: string,
    subCategories: Category[] | undefined
  ) => {
    e.preventDefault();
    if (subCategories && subCategories?.length > 0) {
      setCategories(subCategories);
      setHistoryCategories((prev) => [...prev, categories]);
    } else {
      setValue("category", { id: categoryId, name: categoryName });
    }
  };

  const handleBackCategory = () => {
    if (historyCategories.length === 0) return;
    setCategories(historyCategories[historyCategories.length - 1]); // Gán phần tử cuối cùng của stack vào setCategories
    setHistoryCategories((prevCategories) => {
      const newHistoryCategories = [...prevCategories]; // Tạo bản sao của mảng stack
      newHistoryCategories.pop(); // Xóa phần tử cuối cùng
      return newHistoryCategories; // return new stack
    });
  };

  return (
    <div className="bg-white border rounded-sm overflow-hidden">
      <h3 className="p-2">Danh mục sản phẩm</h3>
      <Separator />
      <div
        className={cn(
          "p-4 flex items-center space-x-8 min-h-full transition-all duration-300",
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
        {categories.map(({ id, name, image, subCategories }) => {
          return (
            <Button
              key={id}
              variant={"outline"}
              className="py-6 space-x-2"
              onClick={(e) =>
                handleSelectSubCategory(e, id, name, subCategories)
              }
            >
              <div className="aspect-square h-8 rounded-sm">
                <Image
                  src={image || "/assets/product-default.jpg"}
                  alt={`${name}`}
                  width={50}
                  height={50}
                />
              </div>
              <p className="text-sm">{name}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
