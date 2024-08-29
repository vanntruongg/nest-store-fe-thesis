import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MESSAGES } from "~/common/constants/messages";
import cartApi from "~/apis/cart-api";
import { useUser } from "~/hooks/useUser";
import { CartUtil } from "~/common/utility/cart.util";
import { useCart } from "~/hooks/useCart";
import { SizeWithQuantity } from "~/common/model/common.model";
import { cn } from "~/lib/utils";

export interface IQuantitySelectorProps {
  productId: number;
  sizeQuantity: SizeWithQuantity[];
  selectedSize?: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  availableQuantity: number;
  error: boolean | null;
  setError: (error: boolean) => void;
  setShowAlertDialog: (error: boolean) => void;
}

export function QuantitySelector({
  productId,
  sizeQuantity,
  selectedSize,
  quantity,
  setQuantity,
  availableQuantity,
  error,
  setError,
  setShowAlertDialog,
}: IQuantitySelectorProps) {
  const { user } = useUser();
  const { itemsCart } = useCart();
  const prevQuantityRef = useRef<number>(quantity);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [sizeQuantityInCart, setSizeQuantityInCart] = useState<
    SizeWithQuantity[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 600);

    return () => clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.email !== "" && itemsCart.length > 0) {
        const res = await cartApi.getByUserAndProductId(user.email, productId);
        setSizeQuantityInCart(res.payload.data);
      }
    };
    fetchData();
  }, [productId, user.email]);

  useEffect(() => {
    if (sizeQuantityInCart && selectedSize) {
      if (
        !CartUtil.validateQuantity(
          sizeQuantityInCart,
          selectedSize,
          quantity,
          availableQuantity
        )
      ) {
        setQuantity(0);
      }
    }
  }, [sizeQuantityInCart, selectedSize, availableQuantity]);

  const inCreaseQuantity = () => {
    if (selectedSize) {
      const quantityInCart = sizeQuantityInCart
        ? CartUtil.getProductQuantityBySize(sizeQuantityInCart, selectedSize)
        : 0;
      if (quantityInCart) {
        const totalQuantityInCart = quantity + quantityInCart;
        if (totalQuantityInCart >= availableQuantity) {
          setShowAlertDialog(true);
          return;
        }
      }
    }

    if (quantity === availableQuantity) {
      setError(true);
      return;
    }
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      prevQuantityRef.current = newQuantity;
      return newQuantity;
    });
  };

  const deCreaseQuantity = useCallback(() => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        prevQuantityRef.current = newQuantity;
        return newQuantity;
      }
      return prev;
    });
    if (error && quantity <= availableQuantity) {
      setError(false);
    }
  }, [error, quantity, availableQuantity, setQuantity, setError]);

  const handleBlurInput = useCallback(() => {
    if (isNaN(quantity) || quantity === 0) {
      setQuantity(prevQuantityRef.current);
      return;
    } else {
      prevQuantityRef.current = quantity;
    }
    if (availableQuantity) {
      if (quantity > availableQuantity) {
        setQuantity(availableQuantity);
      }
    }
  }, [quantity, availableQuantity, setQuantity]);

  return (
    <div className="px-4 py-2 space-y-2">
      <div className="grid grid-cols-10 items-center">
        <span className="col-span-2">Số lượng</span>
        <div className="col-span-8">
          <div className="flex items-center space-x-4">
            <div className="flex border self-start border-gray-300">
              <div className="p-2 max-w-20 border-r flex justify-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  onBlur={handleBlurInput}
                  className="w-full font-light text-center"
                />
              </div>
              <div className="flex flex-col divide-y divide-gray-300">
                <button
                  onClick={inCreaseQuantity}
                  className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <ChevronUp strokeWidth={2} className="size-5" />
                </button>
                <button
                  onClick={deCreaseQuantity}
                  className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <ChevronDown strokeWidth={2} className="size-5" />
                </button>
              </div>
            </div>
            {selectedSize && (
              <p className="text-sm text-muted-foreground">
                Có sẵn{" "}
                {CartUtil.getProductQuantityBySize(sizeQuantity, selectedSize)}{" "}
                sản phẩm
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-10 ">
        {error ? (
          <span className={cn("col-start-3 col-span-8 text-sm text-red-500")}>
            {MESSAGES.EXCEEDS_MAXIMUM_QUANTITY}
          </span>
        ) : (
          <span className="col-start-3 col-span-8 text-sm text-transparent">
            &nbsp;
          </span>
        )}
      </div>
    </div>
  );
}
