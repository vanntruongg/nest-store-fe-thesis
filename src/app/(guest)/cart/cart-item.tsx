import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useCheckout } from "~/hooks/useCheckout";
import { ProductUtil } from "~/common/utility/product.util";
import {
  Item,
  ItemResponse,
  UpdateCartRequest,
} from "~/common/model/cart.model";
import { useUser } from "~/hooks/useUser";
import cartApi from "~/apis/cart-api";
import { BaseUtil } from "~/common/utility/base.util";
import { toast } from "~/components/ui/use-toast";
import { useCart } from "~/hooks/useCart";
import useDebounce from "~/hooks/useDebounce";
import { cn } from "~/lib/utils";
import productApi from "~/apis/book-api";

interface CartItemProps {
  item: ItemResponse;
  fetchData: () => void;
}

const CartItem = ({ item, fetchData }: CartItemProps) => {
  const { user } = useUser();
  const { removeFromCart } = useCart();
  const { items, addItem, removeItem, updateQuantityItemCheckOut } =
    useCheckout();
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  // useEffect(() => {
  //   const fetchStock = async () => {
  //     const result = await productApi.getStockById(item.productId);
  //     setStock(result.payload.data);
  //   };
  //   fetchStock();
  // }, [item.productId]);

  // delay call api when increase or decrease quantity continuously

  const debounceQuantity = useDebounce(quantity, 500);
  const updateItem = useCallback(
    async (quantity: number) => {
      setLoading(true);
      try {
        const data: UpdateCartRequest = {
          email: user.email,
          itemId: item.product.id,
          quantity,
        };

        await cartApi.udpate(data);
        fetchData();
      } catch (error) {
        setQuantity(item.quantity);
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    },
    [item.product.id]
  );
  // handle quantity change on blur or debounced value update
  useEffect(() => {
    // check when user clear input
    if (isNaN(debounceQuantity) || !isMounted) {
      setIsMounted(true);
      return;
    }

    // call api update quantity
    updateItem(debounceQuantity);

    // update quantity item in storage to update total price items checkout
    updateQuantityItemCheckOut(item.product.id, debounceQuantity);
  }, [debounceQuantity]);

  const handleBlurInputQuantity = (quantity: number) => {
    // if user clear input or input === 0
    if (isNaN(quantity) || quantity === 0) {
      quantity = item.quantity;
      setQuantity(item.quantity);
    }
    updateItem(quantity);
  };

  const setIncreaseQuantity = () => {
    if (quantity < item.product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const setDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // select to checkout
  const handleSelectedItem = (checked: CheckedState) => {
    if (checked) {
      addItem({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.imageUrl,
        quantity,
      });
    } else {
      removeItem(item.product.id);
    }
  };

  // call api delete database
  const deleteItem = async () => {
    try {
      const result = await cartApi.remove(user.email, item.product.id);
      // set to cart localsotorage

      removeFromCart(item.product.id);
      toast({
        description: result.payload.message,
      });
      fetchData();
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  return (
    <div key={item.product.id} className="flex items-center py-6 sm:py-10">
      <div className="mt-1 pr-4">
        <Checkbox
          checked={items.some(
            (existingProduct) => existingProduct.id === item.product.id
          )}
          onCheckedChange={(checked) => handleSelectedItem(checked)}
        />
      </div>
      <div className="grid grid-cols-12 w-full gap-4 ">
        <div className="col-span-6 flex gap-4">
          <div className="relative size-24 ">
            <Image
              src={item.product.imageUrl ? item.product.imageUrl : ""}
              fill
              sizes="100"
              alt="product image"
              className="h-full w-full rounded-md object-cover object-center sm:size-48"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="text-base">
              <Link
                href={ProductUtil.createSlug(
                  item.product.name,
                  item.product.id
                )}
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {item.product.name}
              </Link>
            </h3>
            <div className="flex gap-1">
              <span>Còn lại:</span>
              <p className="text-red-400">{item.product.stock}</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-center ">
            {ProductUtil.formatPrice(item.product.price)}
          </div>
          <div className="flex items-center justify-center">
            <div className="flex border border-gray-300">
              <div className="p-2 max-w-20 min-w-20  border-r flex items-center justify-center">
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    onBlur={() => handleBlurInputQuantity(quantity)}
                    className="w-full font-light text-center"
                  />
                )}
              </div>
              <div className="flex flex-col divide-y divide-gray-300">
                <button
                  onClick={setIncreaseQuantity}
                  className={cn(
                    "p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300",
                    {
                      "opacity-20 pointer-events-none":
                        quantity === item.product.stock,
                    }
                  )}
                >
                  <ChevronUp strokeWidth={2} className="size-5" />
                </button>
                <button
                  onClick={setDecreaseQuantity}
                  className={cn(
                    "p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300",
                    {
                      "opacity-20 pointer-events-none": quantity === 1,
                    }
                  )}
                >
                  <ChevronDown strokeWidth={2} className="size-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {ProductUtil.formatPrice(item.product.price * item.quantity || 0)}
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant={"link"}
              className="hover:border border-gray-200"
              onClick={deleteItem}
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
