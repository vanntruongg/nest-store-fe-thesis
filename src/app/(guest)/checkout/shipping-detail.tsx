"use client";
import { useCheckout } from "~/hooks/useCheckout";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useEffect, useState } from "react";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";
import { toast } from "~/components/ui/use-toast";
import { useUser } from "~/hooks/useUser";
import { AddressData } from "~/components/address-data";
import { Address } from "~/common/model/address.model";

export function ShippingDetail() {
  const { user } = useUser();
  const { shippingDetail, setShippingDetail } = useCheckout();
  const [name, setName] = useState<string>(user.firstName);
  const [phone, setPhone] = useState<string>(user.phone || "");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [tempAddress, setTempAddress] = useState<Address>({
    city: 0,
    district: 0,
    ward: 0,
  });

  const [specificAddress, setSpecificAddress] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    // when reload window if shippingDetail is not empty, set shippingDetail with user's info
    // if (BaseUtil.isShippingDetailEmpty(shippingDetail)) {
    //   setShippingDetail(user.firstName || "", user.phone || "", "");
    // }
  }, [user, shippingDetail]);

  const handleSaveChanges = () => {
    if (phone && !BaseUtil.validateVietnamesePhoneNumber(phone)) {
      toast({
        description: "Số điện thoại không hợp lệ",
        variant: "destructive",
      });
      return;
    }
    // if (
    //   specificAddress === "" ||
    //   tempAddress.city === "" ||
    //   tempAddress.district === "" ||
    //   tempAddress.ward === ""
    // ) {
    //   toast({
    //     description: "Vui lòng thêm địa chỉ",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // setShippingDetail(
    //   name,
    //   phone,
    //   tempAddress.ward + ", " + tempAddress.district + ", " + tempAddress.city,
    //   specificAddress
    // );
    setOpen(false);
  };

  return (
    <div className="bg-white p-4 px-8">
      <p className="text-lg text-primary">Địa chỉ nhận hàng</p>
      <div className="w-full flex justify-between gap-8 items-center py-2">
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Họ tên:</p>
          {isMounted ? (
            <p className="font-medium">
              {shippingDetail.name ? shippingDetail.name : `...`}
            </p>
          ) : (
            <IconTextLoading />
          )}
        </div>
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Số điện thoại:</p>
          {isMounted ? (
            <p className="font-medium">
              {shippingDetail.phone ? shippingDetail.phone : `...`}
            </p>
          ) : (
            <IconTextLoading />
          )}
        </div>
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Địa chỉ:</p>
          {isMounted ? (
            <p className="font-medium">
              {/* {shippingDetail.address ? shippingDetail.address : `...`} */}
            </p>
          ) : (
            <IconTextLoading />
          )}
        </div>

        {/* update */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Cập nhật thông tin giao hàng
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Cập nhật thông tin giao hàng</DialogTitle>
              <DialogDescription>
                Thêm mới hoặc cập nhật địa chỉ giao hàng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex gap-2 items-center">
                <Label htmlFor="name" className="min-w-24">
                  Họ Tên
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label htmlFor="phone" className="min-w-24">
                  Số điện thoại
                </Label>
                <Input
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-center">
                <Label htmlFor="address" className="min-w-24">
                  Địa chỉ
                </Label>
                <div className="w-full flex flex-col space-y-2">
                  {/* <AddressData
                    // address={shippingDetail.address}
                    tempAddress={tempAddress}
                    setTempAddress={setTempAddress}
                  /> */}
                  <Input
                    id="specificAddress"
                    value={specificAddress}
                    placeholder="Tên đường, Tòa nhà, Số nhà."
                    onChange={(e) => setSpecificAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveChanges}
              >
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
