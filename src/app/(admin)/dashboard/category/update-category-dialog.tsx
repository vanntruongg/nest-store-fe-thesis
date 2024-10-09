import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  UpdateCategoryShema,
  UpdateCategoryShemaType,
} from "~/app/schema-validations/category.shema";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { CategoryPut, ICategory } from "~/modules/product/models/Category";
import { useState } from "react";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { uploadToCloudinary } from "~/modules/common/services/CloudinaryService";
import { FormCreateOrUpdateCategory } from "./form-create-or-update-category";

export interface Props {
  category: ICategory;
  categorySelected: string[];
  handleUpdate: (categoryPut: CategoryPut) => void;
}

export function UpdateCategoryDialog({
  category,
  categorySelected,
  handleUpdate,
}: Props) {
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<UpdateCategoryShemaType>({
    resolver: zodResolver(UpdateCategoryShema),
    defaultValues: {
      id: category.id,
      name: category.name,
      imageUrl: category.image || "",
      category: { id: 0, name: "" },
      isTopLevel: false,
    },
  });

  const handleUpdateCategory = async (data: UpdateCategoryShemaType) => {
    let imageUrl;
    if (imageSelected) {
      imageUrl = await uploadToCloudinary(imageSelected);
    } else {
      imageUrl = data.imageUrl;
    }

    const categoryPut: CategoryPut = {
      categoryId: data.id,
      name: data.name,
      imageUrl,
      parentCategoryId: data.category.id,
      isTopLevel: data.isTopLevel,
    };

    handleUpdate(categoryPut);
    form.reset();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
        <Button size={"icon"} variant={"outline"}>
          <PencilLine size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-[625px] max-h-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Cập nhật danh mục sản phẩm</AlertDialogTitle>
        </AlertDialogHeader>

        <ScrollArea className="h-96 p-2">
          {/* <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateCategory)}
              className="flex flex-col space-y-4"
            >
              <div className="col-span-3 flex flex-col space-y-4">
                <div className="bg-white border rounded-md p-4">
                  <ImagePreviewUploader
                    image={form.getValues("imageUrl")}
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                    form={form}
                    className={"w-1/6"}
                  />
                </div>
              </div>
              <div className="text-base">
                Danh mục cha: {categorySelected.map((c) => c).join(" > ")}
              </div>
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
              </div>
            </form>
          </Form> */}
          <FormCreateOrUpdateCategory
            currentCategory={category}
            form={form}
            imageSelected={imageSelected}
            setImageSelected={setImageSelected}
            onSubmit={handleUpdate}
          >
            <div className="bg-white border rounded-md p-4 space-y-2">
              <FormField
                control={form.control}
                name="isTopLevel"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isTopLevel"
                          checked={field.value ?? false}
                          onCheckedChange={(e) =>
                            form.setValue(field.name, Boolean(e))
                          }
                        />
                        <label
                          htmlFor="isTopLevel"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Đặt danh mục cao nhất
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </FormCreateOrUpdateCategory>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Hủy
          </AlertDialogCancel>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleUpdateCategory)}
            className="self-start"
          >
            Lưu
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
