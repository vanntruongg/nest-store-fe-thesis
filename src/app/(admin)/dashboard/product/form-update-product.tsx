"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";

import Loading from "~/common/components/loading";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/common/components/icon-text-loading";
import { ImagePreviewUploader } from "~/common/components/image/image-preview-uploader";
import { CategorySelector } from "./category-selector";

import {
  ProductShema,
  ProductShemaUpdate,
  ProductShemaUpdateType,
} from "~/app/schema-validations/product.shema";

import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { Product } from "~/modules/product/models/Product";
import { ProductPut } from "~/modules/product/models/ProductPut";
import { uploadToCloudinary } from "~/modules/common/services/CloudinaryService";

interface Props {
  product: Product;
  updateProduct: (productPut: ProductPut) => any;
}

export function FormUpdateProduct({ product, updateProduct }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );
  // const [category, setCategory] = useState<CategoryInProduct>(product.category);
  const form = useForm<ProductShemaUpdateType>({
    resolver: zodResolver(ProductShemaUpdate),
    defaultValues: {
      name: product.name,
      price: product.price,
      material: product.material,
      style: product.style,
      imageUrl: product.imageUrl,
      description: product.description,
      category: { id: product.category.id, name: product.category.name },
    },
  });

  const onSubmit = async ({
    name,
    price,
    material,
    style,
    imageUrl,
    description,
    category,
  }: ProductShemaUpdateType) => {
    setLoading(true);

    try {
      if (imageSelected) {
        // handle upload image and get url
        imageUrl = await uploadToCloudinary(imageSelected);
      } else {
        imageUrl = product.imageUrl;
      }

      const data: ProductPut = {
        id: product.id,
        name,
        price,
        material,
        style,
        imageUrl,
        description,
        categoryId: category.id,
      };

      await updateProduct(data);
      setOpen(false);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {loading && <Loading />}
      <DialogTrigger asChild className="p-1.5 rounded-sm hover:bg-gray-100">
        <div
          className="w-full text-sm cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Cập nhật sản phẩm
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-100 py-2 sm:max-w-[1025px]">
        <DialogHeader>
          <DialogTitle>Cập nhật sản phẩm</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-96 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-8 space-x-4"
            >
              <div className="col-span-5 space-y-2">
                <div className="bg-white p-4 space-y-2 border rounded-md">
                  <CategorySelector category={product.category} form={form} />
                  {/* category */}
                  <FormField
                    control={form.control}
                    name="category.name"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Danh mục sản phẩm</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="bg-white border rounded-sm">
                  <h3 className="p-2">Chi tiết sản phẩm</h3>
                  <Separator />
                  <div className="p-4 space-y-2">
                    {/* name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Tên sản phẩm</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    {/* descriptiom */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Mô tả sản phẩm</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={6} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-3 flex flex-col space-y-4">
                <ImagePreviewUploader
                  form={form}
                  imageSelected={imageSelected}
                  setImageSelected={setImageSelected}
                  image={product.imageUrl}
                  className="w-1/2"
                />
                <div className="bg-white p-4 space-y-2 border rounded-md">
                  {/* price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Giá</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* material */}
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Chất liệu</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* style */}
                  <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Phong cách</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          {loading ? (
            <Button variant={"outline"}>
              <IconTextLoading />
            </Button>
          ) : (
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Lưu thay đổi
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
