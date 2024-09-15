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
import { Button } from "~/components/ui/button";
import { SquarePen } from "lucide-react";

interface Props {
  productId: number;
  productName: string;
}

export function PostRatingForm({ productId, productName }: Props) {
  const form = useForm<RatingShemaType>({
    resolver: zodResolver(RatingShema),
    defaultValues: {
      ratingStar: 5,
      content: "",
    },
  });

  const handleCreateRating = async (data: RatingShemaType) => {
    // console.log(data);
    const ratingPost: RatingPost = {
      content: data.content,
      star: data.ratingStar,
      productId,
      productName,
    };
  };

  const handleChangeRating = (ratingStar: number) => {
    form.setValue("ratingStar", ratingStar);
  };

  return (
    <AlertDialog
    //  open={open} onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild className="self-start">
        <Button variant={"outline"} className="space-x-1">
          <SquarePen size={20} strokeWidth={1.5} />
          <span> Viết đánh giá</span>
        </Button>
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
            <FormField
              control={form.control}
              name="ratingStar"
              render={({ field }) => (
                <FormItem className="w-full flex items-center space-x-2">
                  <FormLabel className="text-lg leading-none">
                    Đánh giá của bạn:
                  </FormLabel>
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
