import { useEffect } from "react";
import { MapPin } from "lucide-react";
import { AddressListSelector } from "~/modules/address/components/address-list-selector";
import { BaseUtil } from "~/common/utility/base.util";
import { useCheckout } from "~/hooks/useCheckout";
import { getDefaultAddress } from "~/modules/user/services/UserAddressService";
import { AddressFormDialog } from "../user/address/address-form-dialog";
import { AddressAction } from "~/modules/address/modules/AddressAction";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface Props {
  error: boolean;
}

export function DeliveryAddress({ error }: Props) {
  const { deliveryAddress, setDeliveryAddress } = useCheckout();

  const fetchData = async () => {
    if (!deliveryAddress) {
      const res = await getDefaultAddress();
      setDeliveryAddress(res.data);
    }
  };
  useEffect(() => {
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
    <div
      className={cn("bg-white py-6 px-8 border-t-2 border-primary", {
        "bg-red-100 border-red-500": error,
      })}
    >
      <div className="flex justify-between items-center space-x-2 text-lg text-primary leading-none">
        <div className="flex items-center space-x-2">
          <MapPin size={18} />
          <p>Địa chỉ giao hàng</p>
        </div>
        {!deliveryAddress && (
          <AddressFormDialog
            action={AddressAction.CREATE}
            title="Địa chỉ mới"
            fetchData={fetchData}
          >
            <Button>Thêm địa chỉ giao hàng</Button>
          </AddressFormDialog>
        )}
      </div>
      {deliveryAddress ? (
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
      ) : (
        <div className="p-2 space-x-4">
          {error && (
            <span className="text-sm text-red-500">
              Vui lòng thêm địa chỉ giao hàng
            </span>
          )}
        </div>
      )}
    </div>
  );
}
