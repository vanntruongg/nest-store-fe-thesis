import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "~/common/constants/routes";

interface Props {
  cartLength: number;
}

const Cart = ({ cartLength }: Props) => {
  return (
    <Link
      href={ROUTES.CART}
      className="hover:bg-gray-100 p-2 rounded-full relative"
    >
      <ShoppingCart strokeWidth={2} className="size-5 text-slate-700" />
      <span className="absolute top-0.5 right-0.5 size-4 flex justify-center items-center text-xs bg-primary text-white rounded-full">
        {cartLength}
      </span>
    </Link>
  );
};

export default Cart;
