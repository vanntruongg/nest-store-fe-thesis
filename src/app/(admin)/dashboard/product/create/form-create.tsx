import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { ImagePreviewUploader } from "~/common/components/image/image-preview-uploader";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { CategorySelector } from "../category-selector";
import { InventorySelector } from "../inventory-selector";

export interface Props {
  form: UseFormReturn<any>;
  imageSelected: FileWithPreview | null;
  setImageSelected: Dispatch<SetStateAction<FileWithPreview | null>>;
  onSubmit: (data: any) => void;
}

export function FormCreateProduct({
  form,
  onSubmit,
  imageSelected,
  setImageSelected,
}: Props) {
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
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Mô tả sản phẩm</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-white border rounded-md p-4 space-y-2">
            <h3 className="text-lg font-semibold">Danh mục</h3>
            <CategorySelector form={form} />
          </div>

          <div className="bg-white border rounded-md p-4 space-y-2">
            <h3 className="text-lg font-semibold">Chi tiết sản phẩm</h3>
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Chất liệu</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Phong cách</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="self-start"
          >
            Thêm sản phẩm
          </Button>
        </div>
        <div className="col-span-3 flex flex-col space-y-4">
          <div className="bg-white border rounded-md p-4">
            <ImagePreviewUploader
              imageSelected={imageSelected}
              setImageSelected={setImageSelected}
              form={form}
              className={"w-1/2"}
            />
          </div>
          <div className="bg-white border rounded-md p-4 space-y-2">
            <h3 className="text-lg font-semibold">Giá</h3>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <InventorySelector form={form} context="create" />
        </div>
      </form>
    </Form>
  );
}
