"use client";
import { Button } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Input } from "~/common/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/common/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { FileWithPreview } from "~/common/model/file.model";

import Loading from "~/common/components/loading";
import { BaseUtil } from "~/common/utility/base.util";
import { toast } from "~/common/components/ui/use-toast";
import { CloudinaryUtil } from "~/common/utility/cloudinary.util";
import IconTextLoading from "~/common/components/icon-text-loading";
import { Category, Product, ProductUpdate } from "~/common/model/product.model";
import productApi from "~/apis/product-api";
import {
  ProductShema,
  ProductShemaType,
} from "~/app/schema-validations/product.shema";
import { Separator } from "~/common/components/ui/separator";
import { CategorySelect } from "./category-select";

interface IFormUpdateUserProps {
  product: Product;
  fetchData: () => void;
}

export function FormUpdate({ product, fetchData }: IFormUpdateUserProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState(
    product.images[0].imageUrl || ""
  );
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );
  const [category, setCategory] = useState<Category>(product.category);
  const form = useForm<ProductShemaType>({
    resolver: zodResolver(ProductShema),
    defaultValues: {
      name: product.name,
      price: product.price,
      material: product.material,
      style: product.style,
      imageUrl: product.images[0].imageUrl,
      category: { id: product.category.id, name: product.category.name },
    },
  });

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handlePerviewimage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as FileWithPreview;

    if (file) {
      setImageSelected(file);
      file.preview = URL.createObjectURL(file);
      setImagePreview(file.preview);
    }
  };
  const onSubmit = async ({
    name,
    price,
    material,
    style,
    imageUrl,
    stock,
    category,
  }: ProductShemaType) => {
    setLoading(true);

    try {
      // handle upload image and get url
      if (imageSelected) {
        imageUrl = await CloudinaryUtil.handleUploadImage(
          imageSelected,
          imagePreview
        );
      }

      const data: ProductUpdate = {
        id: product.id,
        name,
        price,
        material,
        style,
        images: product.images,
        // stock,
        categoryId: category.id,
      };

      const result = await productApi.updateProduct(data);
      fetchData();
      toast({ description: result.payload.message });
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
        <div className="grid grid-cols-6 space-x-16">
          <div className="col-span-1 flex flex-col space-y-4">
            <div className="bg-muted mx-auto w-full bg-gray-100 aspect-square relative">
              <Image
                src={
                  imagePreview ? imagePreview : "/assets/product-default.jpg"
                }
                alt="image"
                fill
                sizes="100"
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <input
                id="chooseimage"
                type="file"
                accept="png, jpeg"
                onChange={handlePerviewimage}
                className="border sr-only"
              />
              <label htmlFor="chooseimage" className="mt-8 mb-4 cursor-pointer">
                <span className="px-4 py-1 border border-gray-500 rounded-full">
                  Chọn ảnh
                </span>
              </label>
              <span className="text-xs text-gray-500">
                Định dạng: PNG, JPEG
              </span>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="col-span-5 space-y-4"
            >
              <CategorySelect category={category} setValue={form.setValue} />
              <div className="bg-white border rounded-sm">
                <h3 className="p-2">Chi tiết sản phẩm</h3>
                <Separator />
                <div className="p-4 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Tên sản phẩm:</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category.name"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Danh mục sản phẩm:</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Chất liệu:</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Giá:</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => {
                      return (
                        <FormItem className="">
                          <FormLabel>Số lượng:</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
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
