import { Category, ICategory } from "~/modules/product/models/Category";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export interface Props {
  currentCategory?: ICategory;
  categories: Category[];
  form: any;
}

export function CategorySelectorRecusor({
  currentCategory,
  categories,
  form,
}: Props) {
  const handleSelectCategory = (e: any, category: ICategory) => {
    e.preventDefault();
    form.setValue("category", { id: category.id, name: category.name });
  };

  return (
    <Accordion type="single" collapsible className="text-sm w-full ">
      {categories.map(({ category, subCategories }) => (
        <AccordionItem
          key={category.id}
          value={`item-${category.id}`}
          className="border-none "
        >
          {currentCategory?.id !== category.id && (
            <AccordionTrigger className="p-2 font-semibold text-gray-700 hover:no-underline hover:text-primary ">
              <div
                className="hover:underline"
                onClick={(e) => handleSelectCategory(e, category)}
              >
                {category.name}
              </div>
            </AccordionTrigger>
          )}
          {subCategories && subCategories.length > 0 && (
            <AccordionContent className="px-2">
              <CategorySelectorRecusor
                currentCategory={currentCategory}
                categories={subCategories}
                form={form}
              />
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
