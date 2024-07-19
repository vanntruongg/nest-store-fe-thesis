import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUser } from "~/hooks/useUser";
import { MapPin } from "lucide-react";
import userAddressApi from "~/apis/user-address";
import { Address } from "~/common/model/address.model";
import { AddressListSelector } from "~/components/address/address-list-selector";
import { BaseUtil } from "~/common/utility/base.util";
import { useCheckout } from "~/hooks/useCheckout";
import { Skeleton } from "~/components/ui/skeleton";

export function DeliveryAddress() {
  const { user } = useUser();
  const { deliveryAddress, setDeliveryAddress } = useCheckout();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userAddressApi.getDefaultAddress(user.email);
      setDeliveryAddress(res.payload.data);
    };
    fetchData();
    setIsMounted(true);
  }, []);

  const renderAddress = () => {
    return deliveryAddress
      ? `${deliveryAddress.street}, 
        ${BaseUtil.renderAddressName(
          deliveryAddress.ward,
          deliveryAddress.district,
          deliveryAddress.province
        )} `
      : "";
  };

  return isMounted ? (
    <div className="bg-white py-6 px-8 border-t-2 border-primary">
      <div className="flex items-center space-x-2 text-lg text-primary leading-none">
        <MapPin size={18} />
        <p>Địa chỉ nhận hàng</p>
      </div>
      <div className="flex items-center space-x-10 pt-2">
        <div className="flex space-x-2 font-bold">
          <h4>{deliveryAddress?.name}</h4>
          <h4>{BaseUtil.formatPhoneNumber(deliveryAddress?.phone)}</h4>
        </div>
        <div className="flex items-center space-x-4">
          <p className="">{renderAddress()}</p>
          {deliveryAddress?.default && (
            <div className="text-primary text-[10px] border border-primary px-1.5 py-0.5 relative overflow-hidden">
              <span className="size-2 bg-primary absolute top-0 left-0 -translate-x-1 -translate-y-1 rotate-45"></span>
              <span>Mặc định</span>
            </div>
          )}
        </div>
        <AddressListSelector />
      </div>
    </div>
  ) : (
    <DeliveryAddressPlaceHolder />
  );
}

const DeliveryAddressPlaceHolder = () => {
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
};
