import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ProductDetail from "../../../modules/product/components/product-detail";
import { Product } from "~/common/model/product.model";
import { cn } from "~/lib/utils";

interface QuickViewIconProps {
  product: Product;
  className?: string;
}

const QuickViewIcon = ({ product, className }: QuickViewIconProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <div
                className={cn(
                  `p-2.5 bg-white border border-gray-300 rounded-full hover:border-transparent hover:bg-primary hover:text-white transition-all duration-500 self-start group-hover:translate-y-0 ${className}`
                )}
              >
                <Eye strokeWidth={2} size={18} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="backdrop-blur-3xl text-white bg-gray-500 bg-opacity-50 rounded-full px-2 py-1">
              <p>Xem nhanh</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-6xl p-0"
      >
        <ProductDetail product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewIcon;