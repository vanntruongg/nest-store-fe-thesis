import { CartItem as CartItemModel } from "~/common/model/cart.model";
import CartItem from "./cart-item";
import { Checkbox } from "~/components/ui/checkbox";

interface CartItemGroupProps {
  item: CartItemModel;
  fetchData: () => void;
}

const CartItemGroup = ({ item, fetchData }: CartItemGroupProps) => {
  return (
    <div className="bg-white px-4 pb-4 py-2 rounded-md">
      <div className="px-4 py-2">
        <Checkbox className="border-gray-500" />
      </div>
      <div key={item.product.id} className="flex flex-col space-y-4 rounded-md">
        {item.sizeQuantities.map(({ size, quantity }) => (
          <CartItem
            product={item.product}
            productSize={size}
            productQuantity={quantity}
            fetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
};

export default CartItemGroup;
