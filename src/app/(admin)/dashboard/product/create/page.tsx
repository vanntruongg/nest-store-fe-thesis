"use client";
import { useState } from "react";
import { BaseUtil } from "~/common/utility/base.util";
import { ProductPost } from "~/modules/product/models/ProductPost";
import { Input } from "~/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { ImagePreviewUploader } from "~/common/components/image/image-preview-uploader";
import { useForm } from "react-hook-form";
import {
  ProductShema,
  ProductShemaType,
} from "~/app/schema-validations/product.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySelector } from "../category-selector";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { InventorySelector } from "../inventory-selector";
export default function CreateProductPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );

  const form = useForm<ProductShemaType>({
    resolver: zodResolver(ProductShema),
    defaultValues: {
      name: "",
      price: undefined,
      material: "",
      style: "",
      imageUrl: "",
      description: "",
      stock: [],
      category: { id: 0, name: "" },
    },
  });
  const onSubmit = async (data: ProductShemaType) => {
    setLoading(true);
    try {
      const productPost: ProductPost = {
        name: data.name,
        price: data.price,
        material: data.material,
        style: data.style,
        imageUrl: data.imageUrl,
        description: data.description,
        stock: data.stock,
        categoryId: data.category.id,
      };
      console.log(productPost);

      // const result = await createProduct(productPost);
      // toast({ description: result.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-8 space-x-4"
      >
        {/* <CategorySelect form={form} /> */}
        <div className="col-span-5 flex flex-col space-y-4">
          <div className="bg-white border rounded-md p-4 space-y-2">
            <h3 className="text-lg font-semibold">Thông tin chung</h3>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Tên sản phẩm:</FormLabel>
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
                  <FormLabel>Mô tả sản phẩm:</FormLabel>
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
                  <FormLabel>Chất liệu:</FormLabel>
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
                  <FormLabel>Phong cách:</FormLabel>
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
                  <FormLabel>Giá:</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <InventorySelector form={form} />
          {/* <div className="bg-white border rounded-md p-4 space-y-2">
            <h3 className="text-lg font-semibold">Kho</h3>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Kho:</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="bg-gray-100" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div> */}
        </div>
      </form>
    </Form>
  );
}
