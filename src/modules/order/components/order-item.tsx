import Image from "next/image";
import { ProductUtil } from "~/common/utility/product.util";
import { OrderItem as OrderItemModel } from "~/modules/order/model/OrderItem";

interface Props {
  item: OrderItemModel;
}

export default function OrderItem({ item }: Props) {
  const calculateTotalItem = (
    sizeQuantity: { size: string; quantity: number }[]
  ) => {
    return sizeQuantity.reduce((acc, curr) => acc + curr.quantity, 0);
  };
  return (
    <div className="grid grid-cols-12 gap-2 py-4">
      <div className="col-span-2 relative size-24">
        <Image
          src={
            item.productImage ||
            "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1707020101/nest_store/ezz4k2anmgy3plyskssn.jpg"
          }
          fill
          sizes="100"
          alt="product image"
          className="h-full w-full border rounded-md object-cover object-center sm:size-48"
        />
      </div>
      <div className="col-span-8 flex flex-col justify-between">
        <p className="capitalize">{item.productName}</p>
        <div className="flex">
          <p>Phân loại (size):</p>
          <div className="flex divide-x-2">
            {item.sizeQuantityList.map(({ size, quantity }) => (
              <div key={size} className="px-4 space-x-1">
                <span className="text-primary">{size}</span>
                <span>x</span>
                <span>{quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center space-x-2">
        <p>{ProductUtil.formatPrice(item.productPrice)}</p>
        <span>x</span>
        <span>{calculateTotalItem(item.sizeQuantityList)}</span>
      </div>
    </div>
  );
}
