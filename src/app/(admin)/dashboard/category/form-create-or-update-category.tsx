import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ImagePreviewUploader } from "~/common/components/image/image-preview-uploader";
import { CategorySelectorRecusor } from "./category-selector-recusor";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { Category, ICategory } from "~/modules/product/models/Category";
import { getAllCategory } from "~/modules/product/services/CategoryService";
import { BaseUtil } from "~/common/utility/base.util";

export interface Props {
  currentCategory?: ICategory;
  form: any;
  onSubmit: (data: any) => void;
  imageSelected: FileWithPreview | null;
  setImageSelected: Dispatch<SetStateAction<FileWithPreview | null>>;
  children?: ReactNode;
}

export function FormCreateOrUpdateCategory({
  currentCategory,
  form,
  imageSelected,
  setImageSelected,
  onSubmit,
  children,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const result = await getAllCategory();
      setCategories(result.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeSelected = () => {
    form.setValue("category", { id: 0, name: "" });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-8 space-x-4"
      >
        <div className="col-span-5 flex flex-col space-y-4">
          <div className="bg-white border rounded-md p-4 space-y-2">
            <h3 className="text-lg font-semibold">Thông tin chung</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Tên danh mục</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-white border rounded-md p-4 space-y-2">
            <h3 className="text-lg font-semibold">Danh mục</h3>
            {/* <CategorySelector form={form} /> */}
            <div className="p-4 bg-white space-y-4 border rounded-sm ">
              <h3 className="text-lg font-semibold">Chọn danh mục cha</h3>
              <CategorySelectorRecusor
                currentCategory={currentCategory}
                categories={categories}
                form={form}
              />
            </div>
            <div className="flex justify-between items-center">
              <p>Đang chọn: {form.watch("category.name")}</p>
              <Button
                type="reset"
                variant={"secondary"}
                onClick={handleDeSelected}
                disabled={form.watch("category").id === 0}
              >
                Bỏ chọn
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col space-y-4">
          <div className="bg-white border rounded-md p-4">
            <ImagePreviewUploader
              image={form.getValues("imageUrl")}
              imageSelected={imageSelected}
              setImageSelected={setImageSelected}
              form={form}
              className={"w-1/2"}
            />
          </div>
          {children}
        </div>
      </form>
    </Form>
  );
}
