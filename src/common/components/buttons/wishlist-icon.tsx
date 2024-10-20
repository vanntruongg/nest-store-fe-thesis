"use client";
import { useWishlist } from "~/hooks/useWishlist";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { cn } from "~/lib/utils";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Product } from "~/modules/product/models/Product";

interface AddtoWishlistIconProps {
  product: Product;
  className?: string;
}

const AddtoWishlistIcon = ({ product, className }: AddtoWishlistIconProps) => {
  const { items, addItem, removeItem } = useWishlist();

  const existedProduct = items.find((item) => item.product.id === product?.id);
  const handleAddOrRemoveItem = () => {
    if (product) {
      if (existedProduct) {
        removeItem(product.id);
      } else {
        addItem(product);
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            className={cn(
              `p-2.5 bg-white border border-gray-300 rounded-full hover:border-transparent hover:bg-primary hover:text-white transition-all duration-500 self-start group/icon group-hover:translate-y-0 ${className}`
            )}
            onClick={handleAddOrRemoveItem}
          >
            {existedProduct ? (
              <FaHeart
                size={18}
                strokeWidth={2}
                className=" text-primary group-hover/icon:text-white"
              />
            ) : (
              <FaRegHeart size={18} strokeWidth={2} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="backdrop-blur-3xl text-white bg-gray-500 bg-opacity-50 rounded-full px-2 py-1">
          <p>{existedProduct ? "Bỏ yêu thích" : "Thêm vào yêu thích"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddtoWishlistIcon;
