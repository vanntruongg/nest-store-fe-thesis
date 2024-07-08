"use client";
import { useEffect, useState } from "react";
import userAddressApi from "~/apis/user-address";
import { Address } from "~/common/model/address.model";
import { Button } from "~/components/ui/button";
import { useUser } from "~/hooks/useUser";
import { AddNewAddress } from "./add-new-address";

const AddressPage = () => {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await userAddressApi.getAllAddress(user.email);
      // console.log("res: ", res);
      // console.log("user addresses: ", res.payload.data);
      setAddresses(res.payload.data);
    };
    fetchData();
  }, []);

  // const handleUpdate = async () => {
  //   try {
  //     const res = await userAddressApi.updateAddress()
  //   }
  // };
  // const handleDelete = async () => {
  //   try {
  //     const res = await userAddressApi.deleteAddress()
  //   }
  // };
  // const handleSetDefault = async () => {
  //   try {
  //     const res = await userAddressApi.setDefaultAddress()
  //   }
  // };

  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-white rounded-sm">
      <div className="flex justify-between border-b pb-4">
        <h1 className="text-xl font-medium">Địa chỉ của tôi</h1>
        <AddNewAddress />
      </div>
      <div className="">
        <h2 className="">Địa chỉ</h2>
        <div className="divide-y">
          {addresses.map((address) => (
            <div key={address.id} className="py-5 flex justify-between text-sm">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-base">{address.name}</span>
                  <span className="bg-gray-500 h-full w-[0.1px] "></span>
                  <span className="text-muted-foreground">{address.phone}</span>
                </div>
                <div className="text-muted-foreground">
                  <span>{address.street}</span>
                  <p>{`${address.ward.name}, ${address.district.name}, ${address.province.name}`}</p>
                </div>
                {address.default && (
                  <div className="text-primary border border-primary self-start px-1 py-0.5">
                    <span>Mặc định</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-end space-x-2 w-full">
                  <Button variant={"link"} className="text-blue-500 p-0">
                    Cập nhật
                  </Button>
                  {addresses.length > 1 && !address.default && (
                    <Button variant={"link"} className="text-red-500 p-0">
                      Xóa
                    </Button>
                  )}
                </div>
                <Button variant={"outline"} disabled={address.default}>
                  Thiết lập mặc định
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
