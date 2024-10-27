import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { AddressListSelector } from "~/modules/address/components/address-list-selector";
import { BaseUtil } from "~/common/utility/base.util";
import { useCheckout } from "~/hooks/useCheckout";
import { getDefaultAddress } from "~/modules/user/services/UserAddressService";

export function DeliveryAddress() {
  const { deliveryAddress, setDeliveryAddress } = useCheckout();

  useEffect(() => {
    const fetchData = async () => {
      if (deliveryAddress === null) {
        const res = await getDefaultAddress();
        setDeliveryAddress(res.data);
      }
    };
    fetchData();
  }, [deliveryAddress, setDeliveryAddress]);

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

  return (
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
          {deliveryAddress?.isDefault && (
            <div className="text-primary text-[10px] border border-primary px-1.5 py-0.5 relative overflow-hidden">
              <span className="size-2 bg-primary absolute top-0 left-0 -translate-x-1 -translate-y-1 rotate-45"></span>
              <span>Mặc định</span>
            </div>
          )}
        </div>
        <AddressListSelector />
      </div>
    </div>
  );
}
