import { MapPin } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export function DeliveryAddressPlaceHolder() {
  return (
    <div className="bg-white py-6 px-8 border-t-2 border-primary">
      <div className="flex items-center space-x-2 text-lg text-primary leading-none">
        <MapPin size={18} />
        <p>Địa chỉ nhận hàng</p>
      </div>
      <div className="flex items-center space-x-10 pt-2">
        <div className="flex space-x-2 font-bold">
          <Skeleton className="w-[88px] h-6 mt-2" />
          <Skeleton className="w-[104px] h-6 my-2" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="w-[326px] h-6 my-2" />
        </div>
        <div className="px-4">
          <Skeleton className="w-16 h-6 my-2 ml-16" />
        </div>
      </div>
    </div>
  );
}
