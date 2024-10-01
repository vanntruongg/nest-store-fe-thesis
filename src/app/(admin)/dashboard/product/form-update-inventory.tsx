"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { BaseUtil } from "~/common/utility/base.util";
import {
  InventoryUpdateSchema,
  InventoryUpdateType,
} from "~/app/schema-validations/product.shema";
import { Product } from "~/modules/product/models/Product";
import { InventorySelector } from "./inventory-selector";
import IconTextLoading from "~/common/components/icon-text-loading";
import Loading from "~/common/components/loading";
import { InventoryPut } from "~/modules/product/models/InventoryPut";

interface Props {
  product: Product;
  updateInventory: (inventoryPut: InventoryPut) => any;
}

export function FormUpdateInventory({ product, updateInventory }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [category, setCategory] = useState<CategoryInProduct>(product.category);
  const form = useForm<InventoryUpdateType>({
    resolver: zodResolver(InventoryUpdateSchema),
    defaultValues: {
      stock: product.sizeQuantity,
    },
  });

  const onSubmit = async (data: InventoryUpdateType) => {
    setLoading(true);

    const inventoryPut: InventoryPut = {
      productId: product.id,
      sizeQuantity: data.stock,
    };
    try {
      await updateInventory(inventoryPut);
      // toast({ description: result.message });
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
          Cập nhật số lượng
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-100 py-2 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật số lượng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InventorySelector form={form} />
          </form>
        </Form>
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
