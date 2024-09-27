"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { buttonVariants } from "../../../components/ui/button";
import { cn } from "~/lib/utils";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "~/components/ui/skeleton";
import { Category } from "~/modules/product/models/Category";

interface RecursionCategoryProps {
  categories: Category[];
  fontSize: number;
  handleFetchData: (categoryId: number) => void;
}

const RecursionCategory = ({
  handleFetchData,
  categories,
  fontSize,
}: RecursionCategoryProps) => {
  fontSize = fontSize - 1;
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col gap-2 items-start">
      {categories.length > 0 ? (
        categories.map(({ category, subCategories }) =>
          subCategories && subCategories.length > 0 ? (
            <Accordion
              key={category.id}
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger
                  style={{ fontSize: fontSize }}
                  className="p-2 font-semibold text-gray-700 hover:no-underline hover:text-primary"
                >
                  <div
                    onClick={() => handleFetchData(category.id)}
                    className={cn("hover:underline flex items-center gap-1", {
                      "text-primary":
                        Number(searchParams.get("category")) === category.id,
                    })}
                  >
                    {category.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-2">
                  <RecursionCategory
                    handleFetchData={handleFetchData}
                    categories={subCategories}
                    fontSize={fontSize}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div
              key={category.id}
              onClick={() => handleFetchData(category.id)}
              style={{ fontSize: fontSize }}
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: cn(
                    "px-2 py-0 w-full flex justify-start items-center gap-2 text-gray-700 cursor-pointer",
                    {
                      "text-primary":
                        Number(searchParams.get("category")) === category.id,
                    }
                  ),
                })
              )}
            >
              <span className="size-1.5 rounded-full bg-gray-300"></span>
              <p>{category.name}</p>
            </div>
          )
        )
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default RecursionCategory;

const Placeholder = () => {
  return (
    <div className="w-full p-2 space-y-4">
      <Skeleton className=" w-full h-8 bg-gray-200" />
      <Skeleton className=" w-full h-8 bg-gray-200" />
      <Skeleton className=" w-full h-8 bg-gray-200" />
    </div>
  );
};
