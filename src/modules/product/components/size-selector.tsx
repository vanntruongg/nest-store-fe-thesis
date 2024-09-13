import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { MESSAGES } from "~/common/constants/messages";
import { cn } from "~/lib/utils";
import TooltipCustom from "../../../common/components/tooltip-custom";
import { SizeWithQuantity } from "~/common/model/common.model";

export interface ISizeSelectorProps {
  sizes: SizeWithQuantity[];
  selectedSize: string | undefined;
  setSelectedSize: Dispatch<SetStateAction<string | undefined>>;
  error: boolean;
  setError: (error: boolean) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize,
  error,
  setError,
}: ISizeSelectorProps) {
  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    setError(false);
  };

  return (
    <div
      className={cn("px-4 py-2 space-y-2", {
        "bg-red-50": error,
      })}
    >
      <div className={cn("grid grid-cols-10 items-center", {})}>
        <span className="col-span-2">Size</span>
        <div className="flex gap-4">
          {sizes.map(({ size, quantity }) => (
            <RenderSize key={size} quantity={quantity}>
              <div
                className={cn(
                  "bg-white flex justify-center border px-8 py-1 text-sm relative overflow-hidden hover:border-primary hover:text-primary hover:cursor-pointer transition-all duration-200",
                  {
                    "border-primary text-primary": selectedSize === size,
                    "pointer-events-none text-muted-foreground opacity-50":
                      quantity === 0,
                  }
                )}
                onClick={() => handleSelectSize(size)}
              >
                {selectedSize === size && (
                  <div
                    className={cn(
                      "absolute size-5 -bottom-2.5 -right-2.5 bg-primary rotate-45 text-white text-[10px]"
                    )}
                  >
                    <span className="absolute -rotate-45">&#10004;</span>
                  </div>
                )}
                <span>{size}</span>
              </div>
            </RenderSize>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-10">
        {error && (
          <span className="col-start-3 col-span-8 text-sm text-red-500">
            {MESSAGES.INVALID_CLASSIFICATION_ITEM}
          </span>
        )}
      </div>
    </div>
  );
}

interface RenderSizeProps {
  quantity: number;
  children: ReactNode;
}

const RenderSize = ({ quantity, children }: RenderSizeProps) => {
  return quantity !== 0 ? (
    children
  ) : (
    <TooltipCustom content="Hết hàng" disable={true}>
      {children}
    </TooltipCustom>
  );
};
