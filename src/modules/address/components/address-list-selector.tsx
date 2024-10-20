import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AddressFormDialog } from "~/app/(guest)/user/address/address-form-dialog";
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
import { Checkbox } from "../../../components/ui/checkbox";
import { toast } from "../../../components/ui/use-toast";
import { useCheckout } from "~/hooks/useCheckout";
import { Address } from "../modules/Address";
import { AddressAction } from "../modules/AddressAction";
import {
  getAllAddress,
  setDefaultAddress,
} from "~/modules/user/services/UserAddressService";
import { ScrollArea } from "~/components/ui/scroll-area";

export function AddressListSelector() {
  const { deliveryAddress, setDeliveryAddress } = useCheckout();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<
    number | undefined
  >(deliveryAddress?.id);
  const [open, setOpen] = useState<boolean>(false);
  const [openDialogAddnewAddress, setOpenDialogAddNewAddress] =
    useState<boolean>(false);

  const fetchData = async () => {
    try {
      const res = await getAllAddress();
      console.log(res);

      setAddresses(res.data);
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
  }, [addresses, selectedAddress?.id, setDeliveryAddress]);

  const handleChangeAddress = () => {
    if (selectedAddress) {
      setDeliveryAddress(selectedAddress);
    }
  };

  const onChangeSelect = (address: Address) => {
    setSelectedAddress(address);
    setSelectedAddressId(address.id);
  };

  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      const res = await setDefaultAddress(addressId);

      await fetchData();
      toast({ description: res.message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  const processAddNewAddress = () => {
    setOpen(false);
    setOpenDialogAddNewAddress(true);
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="link">Thay đổi</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="min-w-[600px]">
          <AlertDialogHeader className="border-b">
            <AlertDialogTitle>Địa chỉ của tôi</AlertDialogTitle>
          </AlertDialogHeader>
          <ScrollArea className="h-[340px] px-4">
            <div className="divide-y">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="py-4 flex justify-between text-sm"
                >
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
                      {address.isDefault && (
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
                      disabled={address.isDefault}
                      onClick={() => handleSetDefaultAddress(address.id)}
                      className="text-sm px-1.5 py-1"
                    >
                      Thiết lập mặc định
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Button
            className="py-2 px-4 w-[40%] flex items-center space-x-2 bg-primary text-white text-sm"
            onClick={processAddNewAddress}
          >
            <Plus size={20} />
            <span>Thêm địa chỉ mới</span>
          </Button>

          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleChangeAddress}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* add new address */}
      <AddressFormDialog
        isOpen={openDialogAddnewAddress}
        action={AddressAction.CREATE}
        title="Địa chỉ mới"
        fetchData={fetchData}
      ></AddressFormDialog>
    </>
  );
}
