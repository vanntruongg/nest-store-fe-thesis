import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useCheckout } from "~/hooks/useCheckout";
import { ProductUtil } from "~/common/utility/product.util";

import { useUser } from "~/hooks/useUser";
import cartApi from "~/apis/cart-api";
import { BaseUtil } from "~/common/utility/base.util";
import { toast } from "~/components/ui/use-toast";
import { useCart } from "~/hooks/useCart";
import useDebounce from "~/hooks/useDebounce";
import { cn } from "~/lib/utils";
import inventoryApi from "~/apis/inventory-api";
import { DelteCartRequest, UpdateCartRequest } from "~/common/model/cart.model";
import { Product } from "~/common/model/product.model";
import { SizeWithQuantity } from "~/common/model/common.model";

interface CartItemProps {
  product: Product;
  productSize: string;
  productQuantity: number;
  fetchData: () => void;
}

const CartItem = ({
  product,
  productSize,
  productQuantity,
  fetchData,
}: CartItemProps) => {
  const { user } = useUser();
  const { removeFromCart } = useCart();
  const { items, addItem, removeItem, updateQuantityItemCheckOut } =
    useCheckout();
  const [quantity, setQuantity] = useState<number>(productQuantity);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [sizeQuantity, setSizeQuantity] = useState<SizeWithQuantity | null>(
    null
  );

  useEffect(() => {
    const fetchStock = async () => {
      const result = await inventoryApi.getByProductIdAndSize(
        product.id,
        productSize
      );
      setSizeQuantity(result.payload.data);
    };
    fetchStock();
  }, [product.id]);

  // delay call api when increase or decrease quantity continuously

  const debounceQuantity = useDebounce(quantity, 500);
  const updateItem = useCallback(
    async (quantity: number) => {
      setLoading(true);
      try {
        const data: UpdateCartRequest = {
          email: user.email,
          size: productSize,
          productId: product.id,
          quantity,
        };

        await cartApi.udpate(data);
        fetchData();
      } catch (error) {
        setQuantity(productQuantity);
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    },
    [product.id]
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
    updateQuantityItemCheckOut(product.id, debounceQuantity);
  }, [debounceQuantity]);

  const handleBlurInputQuantity = (quantity: number) => {
    // if user clear input or input === 0
    if (isNaN(quantity) || quantity === 0) {
      quantity = quantity;
      setQuantity(quantity);
    }
    updateItem(quantity);
  };

  const setIncreaseQuantity = () => {
    if (sizeQuantity) {
      if (quantity < sizeQuantity.quantity) {
        setQuantity(quantity + 1);
      }
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
        productId: product.id,
        price: product.price,
        quantity,
        size: productSize,
      });
    } else {
      removeItem(product.id, productSize);
    }
  };

  // call api delete database
  const deleteItem = async () => {
    try {
      const data: DelteCartRequest = {
        email: user.email,
        size: productSize,
        productId: product.id,
      };
      const result = await cartApi.delete(data);
      // set to cart localsotorage

      removeFromCart(product.id);
      toast({
        description: result.payload.message,
      });
      fetchData();
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  return (
    <div
      key={product.id}
      className="flex items-center p-4 border border-gray-200 rounded-sm"
    >
      <div className="mt-1 pr-4">
        <Checkbox
          checked={items.some(
            (existingProduct) =>
              existingProduct.productId === product.id &&
              existingProduct.size === productSize
          )}
          onCheckedChange={(checked) => handleSelectedItem(checked)}
          className="border-gray-500"
        />
      </div>
      <div className="grid grid-cols-12 w-full gap-4">
        <div className="col-span-6 flex gap-4">
          <div className="relative min-w-20 aspect-square">
            <Image
              src={product.images ? product.images[0].imageUrl : ""}
              fill
              sizes="100"
              alt="product image"
              className="h-full w-full rounded-md  sm:size-48"
            />
          </div>
          <div className="flex flex-col justify-between leading-none w-[460px]">
            <Link
              href={ProductUtil.createSlug(product.name, product.id)}
              className="font-medium text-gray-700 hover:text-gray-800 truncate"
            >
              {product.name}
            </Link>
            <div className="flex space-x-1">
              <span>Size:</span>
              <p className="text-primary">{productSize}</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-center ">
            {ProductUtil.formatPrice(product.price)}
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
                        quantity === sizeQuantity?.quantity,
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
          <div className="flex items-center justify-center text-primary">
            {ProductUtil.formatPrice(product.price * quantity || 0)}
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant={"link"}
              className="hover:border border-gray-200 text-black hover:text-primary"
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
