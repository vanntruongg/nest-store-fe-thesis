"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/components/ui/textarea";
import {
  RatingShema,
  RatingShemaType,
} from "~/app/schema-validations/rating.shema";
import StarRatings from "react-star-ratings";
import { RatingPost } from "../models/RatingPost";
import { Dispatch, SetStateAction } from "react";
import { createRating } from "../services/RatingService";
import { toast } from "~/components/ui/use-toast";
import { BaseUtil } from "~/common/utility/base.util";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: number;
  productName: string;
}

export function PostRatingForm({
  open,
  setOpen,
  productId,
  productName,
}: Props) {
  const form = useForm<RatingShemaType>({
    resolver: zodResolver(RatingShema),
    defaultValues: {
      ratingStar: 5,
      content: "",
    },
  });

  const handleCreateRating = async (data: RatingShemaType) => {
    const ratingPost: RatingPost = {
      content: data.content,
      star: data.ratingStar,
      productId,
      productName,
    };

    try {
      const res = await createRating(ratingPost);
      if (res.success) {
        toast({ description: res.message });
        setOpen(false);
      }
    } catch (error: any) {
      if (error.status === 409) {
        toast({
          description: "Bạn đã đánh giá sản phẩm này rồi.",
          variant: "destructive",
        });
      } else {
        BaseUtil.handleErrorApi({ error });
      }
    }
  };

  const handleChangeRating = (ratingStar: number) => {
    form.setValue("ratingStar", ratingStar);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="self-start">
        {/* <Button
          variant={"outline"}
          className="space-x-1 border border-primary text-primary hover:text-primary"
        >
          <SquarePen size={20} strokeWidth={1.5} />
          <span> Viết đánh giá</span>
        </Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent className="top-[40%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Đánh giá sản phẩm</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateRating)}
            className="space-y-4"
          >
            <div className="flex space-x-2 items-center ">
              <FormLabel className="text-lg text-nowrap leading-none">
                Tên sản phẩm:
              </FormLabel>
              <p className="text-sm"> {productName}</p>
            </div>
            <FormField
              control={form.control}
              name="ratingStar"
              render={({ field }) => (
                <FormItem className="w-full flex items-center space-x-2">
                  <FormLabel className=" ">Đánh giá của bạn:</FormLabel>
                  <FormControl>
                    <StarRatings
                      rating={field.value}
                      numberOfStars={5}
                      starRatedColor="#eab308"
                      starHoverColor="#eab308"
                      starDimension={"24px"}
                      starSpacing="0"
                      changeRating={handleChangeRating}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Nội dung"
                      className="w-full text-base"
                      spellCheck={"false"}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(handleCreateRating)}>
            Gửi đánh giá
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
