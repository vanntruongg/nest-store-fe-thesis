import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import userAddressApi from "~/apis/user-address";
import { AddressFormDialog } from "~/app/(guest)/user/address/address-form-dialog";
import { Address, AddressAction } from "~/common/model/address.model";
import { BaseUtil } from "~/common/utility/base.util";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { useUser } from "~/hooks/useUser";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";
import { useCheckout } from "~/hooks/useCheckout";

export function AddressListSelector() {
  const { user } = useUser();
  const { deliveryAddress, setDeliveryAddress } = useCheckout();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<
    number | undefined
  >(deliveryAddress?.id);

  const fetchData = async () => {
    try {
      const res = await userAddressApi.getAllAddress(user.email);
      setAddresses(res.payload.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  useEffect(() => {
    fetchData();
    setSelectedAddressId(deliveryAddress?.id);
  }, [deliveryAddress]);

  useEffect(() => {
    const newAddressSelected = addresses.find(
      (address) => address.id === selectedAddress?.id
    );

    if (newAddressSelected) {
      setDeliveryAddress(newAddressSelected);
    }
  }, [addresses]);

  const handleChangeAddress = () => {
    if (selectedAddress) {
      setDeliveryAddress(selectedAddress);
    }
  };

  const onChangeSelect = (address: Address) => {
    setSelectedAddress(address);
    setSelectedAddressId(address.id);
  };

  const setDefaultAddress = async (addressId: number) => {
    try {
      const res = await userAddressApi.setDefaultAddress(user.email, addressId);

      await fetchData();
      toast({ description: res.payload.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link">Thay đổi</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="border-b">
          <AlertDialogTitle>Địa chỉ của tôi</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="divide-y">
          {addresses.map((address) => (
            <div key={address.id} className="py-4 flex justify-between text-sm">
              <div className="flex gap-2">
                <Checkbox
                  className=""
                  checked={selectedAddressId === address.id}
                  onCheckedChange={() => onChangeSelect(address)}
                />
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center divide-x-[1.5px]">
                    <span className="pr-2 text-base">{address.name}</span>
                    <span className="pl-2 text-muted-foreground">
                      {BaseUtil.formatPhoneNumber(address.phone)}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    <span>{address.street}</span>
                    <p>
                      {BaseUtil.renderAddressName(
                        address.ward,
                        address.district,
                        address.province
                      )}
                    </p>
                  </div>
                  {address.default && (
                    <div className="text-primary border border-primary self-start px-1.5 py-0.5 relative overflow-hidden">
                      <span className="size-2 bg-primary absolute top-0 left-0 -translate-x-1 -translate-y-1 rotate-45"></span>
                      <span>Mặc định</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-end space-x-2 w-full">
                  <AddressFormDialog
                    action={AddressAction.UPDATE}
                    title="Cập nhật địa chỉ"
                    address={address}
                    fetchData={fetchData}
                  >
                    <Button variant={"link"} className="text-blue-500 p-0">
                      Cập nhật
                    </Button>
                  </AddressFormDialog>
                </div>
                <Button
                  variant={"outline"}
                  disabled={address.default}
                  onClick={() => setDefaultAddress(address.id)}
                  className="text-sm px-1.5 py-1"
                >
                  Thiết lập mặc định
                </Button>
              </div>
            </div>
          ))}
        </div>
        <AddressFormDialog
          action={AddressAction.CREATE}
          title="Địa chỉ mới"
          fetchData={fetchData}
        >
          <Button className="py-2 px-4 w-[40%] flex items-center space-x-2 bg-primary text-white text-sm">
            <Plus size={20} />
            <span>Thêm địa chỉ mới</span>
          </Button>
        </AddressFormDialog>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleChangeAddress}>
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
