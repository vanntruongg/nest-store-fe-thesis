import Image from "next/image";
import { ProductUtil } from "~/common/utility/product.util";
import { OrderItem } from "~/modules/order/model/OrderItem";

interface Props {
  item: OrderItem;
}

const ItemOrder = ({ item }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-2 py-4">
      <div className="col-span-2 relative size-24 ">
        <Image
          src={
            item.productImage ||
            "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1707020101/nest_store/ezz4k2anmgy3plyskssn.jpg"
          }
          fill
          sizes="100"
          alt="product image"
          className="h-full w-full rounded-md object-cover object-center sm:size-48"
        />
      </div>
      <div className="col-span-8 flex flex-col justify-between">
        <p className="capitalize">{item.productName}</p>
        <div className="space-x-1">
          {/* <span className="text-primary">{item.size}</span>
          <span>x</span>
          <span>{item.quantity}</span> */}
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <p> {ProductUtil.formatPrice(item.productPrice)}</p>
      </div>
    </div>
  );
};

export default ItemOrder;
