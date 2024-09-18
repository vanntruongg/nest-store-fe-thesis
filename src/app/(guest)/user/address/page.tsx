"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { AddressFormDialog } from "./address-form-dialog";

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
import { BaseUtil } from "~/common/utility/base.util";
import { toast } from "~/components/ui/use-toast";
import { Plus } from "lucide-react";
import AddressPlaholder from "~/common/components/skeleton/address-skeleton";
import { Address } from "~/modules/address/modules/Address";
import { AddressAction } from "~/modules/address/modules/AddressAction";
import {
  deleteAddress,
  getAllAddress,
  setDefaultAddress,
} from "~/modules/user/services/UserAddressService";

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const fetchData = async () => {
    const res = await getAllAddress();
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddressAction = async (
    action: AddressAction,
    addressId: number
  ) => {
    try {
      let message: string = "";

      if (action === AddressAction.DELETE) {
        const res = await deleteAddress(addressId);
        message = res.message;
      } else if (action === AddressAction.SET_DEFAULT) {
        const res = await setDefaultAddress(addressId);
        message = res.message;
      }

      fetchData();
      toast({ description: message });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-white rounded-sm">
      <div className="flex justify-between border-b pb-4">
        <h1 className="text-xl font-medium">Địa chỉ của tôi</h1>
        <AddressFormDialog
          action={AddressAction.CREATE}
          title="Địa chỉ mới"
          fetchData={fetchData}
        >
          <Button className="py-2 px-4 flex items-center space-x-2 bg-primary text-white text-sm">
            <Plus size={20} />
            <span>Thêm địa chỉ mới</span>
          </Button>
        </AddressFormDialog>
      </div>
      <div className="">
        <h2 className="">Địa chỉ</h2>
        <div className="divide-y">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address.id}
                className="py-5 flex justify-between text-sm"
              >
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

                    {addresses.length > 1 && address.isDefault ? null : (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={"link"} className="text-red-500 p-0">
                            Xóa
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Bạn chắc chắn muốn xóa địa chỉ này?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Trở lại</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleAddressAction(
                                  AddressAction.DELETE,
                                  address.id
                                )
                              }
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  <Button
                    variant={"outline"}
                    disabled={address.isDefault}
                    onClick={() =>
                      handleAddressAction(AddressAction.SET_DEFAULT, address.id)
                    }
                  >
                    Thiết lập mặc định
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <AddressPlaholder />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
