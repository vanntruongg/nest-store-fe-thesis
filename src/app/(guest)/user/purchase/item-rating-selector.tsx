"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { OrderItem } from "~/modules/order/model/OrderItem";
import { SquarePen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { PostRatingForm } from "~/modules/rating/components/post-rating-form";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  oderItems: OrderItem[];
}

export function ItemRatingSelector({ open, setOpen, oderItems }: Props) {
  const [openPostRatingForm, setOpenPostRatingForm] = useState<boolean>(false);

  const [itemSelectedRating, setItemSelectedRating] =
    useState<OrderItem | null>(null);

  const handleSelectItemRating = (item: OrderItem) => {
    setItemSelectedRating(item);
    setOpenPostRatingForm(true);
    setOpen(false);
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild className="self-start">
          <Button
            variant={"outline"}
            className="space-x-1 border border-primary text-primary hover:text-primary"
          >
            <SquarePen size={20} strokeWidth={1.5} />
            <span>Viết đánh giá</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="top-[40%] min-w-[600px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Chọn sản phẩm đánh giá</AlertDialogTitle>
          </AlertDialogHeader>
          {oderItems.map((item) => (
            <div
              key={item.productId}
              className="px-4 border rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectItemRating(item)}
            >
              <div className="grid grid-cols-12 gap-4 py-4 ">
                <div className="col-span-2 relative size-20">
                  <Image
                    src={
                      item.productImage ||
                      "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1707020101/nest_store/ezz4k2anmgy3plyskssn.jpg"
                    }
                    fill
                    sizes="100"
                    alt="product image"
                    className="h-full w-full border rounded-md object-cover object-center sm:size-48"
                  />
                </div>
                <div className="col-span-10 flex flex-col justify-center">
                  <p className="capitalize">{item.productName}</p>
                </div>
              </div>
            </div>
          ))}
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {itemSelectedRating && (
        <PostRatingForm
          open={openPostRatingForm}
          setOpen={setOpenPostRatingForm}
          productId={itemSelectedRating.productId}
          productName={itemSelectedRating.productName}
        />
      )}
    </>
  );
}
