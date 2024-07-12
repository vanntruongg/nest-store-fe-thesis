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
  const { setDeliveryAddress } = useCheckout();
  const [address, setAddress] = useState<Address>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userAddressApi.getDefaultAddress(user.email);
      setAddress(res.payload.data);
      setDeliveryAddress(res.payload.data.id);
    };
    fetchData();
    setIsMounted(true);
  }, []);
  return (
    <div className="bg-white py-6 px-8 border-t-2 border-primary">
      <div className="flex items-center space-x-2 text-lg text-primary leading-none">
        <MapPin size={18} />
        <p>Địa chỉ nhận hàng</p>
      </div>
      <div className="flex items-center space-x-10 pt-2">
        <div className="flex space-x-2 font-bold">
          {isMounted ? (
            <h4>{address?.name}</h4>
          ) : (
            <Skeleton className="w-[88px] h-6 mt-2" />
          )}
          {isMounted ? (
            <h4>{BaseUtil.formatPhoneNUmber(address?.phone)}</h4>
          ) : (
            <Skeleton className="w-[104px] h-6 my-2" />
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isMounted ? (
            <p className="">
              {`${address?.street}, ${BaseUtil.renderAddressName(
                address?.ward,
                address?.district,
                address?.province
              )} `}
            </p>
          ) : (
            <Skeleton className="w-[326px] h-6 my-2" />
          )}
          <div className="text-primary text-[10px] border border-primary px-1.5 py-0.5 relative overflow-hidden">
            <span className="size-2 bg-primary absolute top-0 left-0 -translate-x-1 -translate-y-1 rotate-45"></span>
            <span>Mặc định</span>
          </div>
        </div>
        {isMounted ? (
          <AddressListSelector setAddress={setAddress} />
        ) : (
          <div className="px-4">
            <Skeleton className="w-14 h-6 my-2" />
          </div>
        )}
      </div>
    </div>
  );
}
