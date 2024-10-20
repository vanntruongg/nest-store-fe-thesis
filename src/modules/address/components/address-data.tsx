import { Fragment, useCallback, useEffect, useState } from "react";

import { BaseUtil } from "~/common/utility/base.util";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "~/lib/utils";
import { AddressShemaType } from "~/app/schema-validations/address.shema";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { AddressIdType, AddressLevel } from "../modules/Address";
import { AddressAction } from "../modules/AddressAction";
import { Location } from "../modules/Loation";
import { getAddressDataByParentCode } from "../services/AddressService";

export interface IAddressDataProps {
  form: UseFormReturn<AddressShemaType>;
  province?: Location;
  district?: Location;
  ward?: Location;
  action: AddressAction;
}

export function AddressData({
  form,
  province,
  district,
  ward,
  action,
}: IAddressDataProps) {
  const [addressData, setAddressData] = useState<
    Record<AddressLevel, Location[]>
  >({
    province: [],
    district: [],
    ward: [],
  });
  const [tabContentAddress, setTabContentAddress] =
    useState<AddressIdType>("provinceId");

  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchAddressData = useCallback(
    async (parentCode: string | null, type: AddressLevel) => {
      const result = await getAddressDataByParentCode(parentCode);

      setAddressData((prev) => ({
        ...prev,
        [type]: result.data,
      }));
    },
    []
  );

  useEffect(() => {
    fetchAddressData(null, "province");

    if (action === AddressAction.UPDATE && province && district) {
      fetchAddressData(province?.code, "district");
      fetchAddressData(district?.code, "ward");
    }
  }, [action, province, district, fetchAddressData]);

  const handleSelectAddress = (
    fieldName: AddressIdType,
    addressId: number,
    code: string
  ) => {
    form.setValue(fieldName, addressId);
    form.clearErrors(fieldName);

    setSearchValue("");

    if (fieldName === "provinceId") {
      form.setValue("districtId", 0);
      form.setValue("wardId", 0);
      fetchAddressData(code, "district");
      onTabChangeDefault("districtId");
    } else if (fieldName === "districtId") {
      fetchAddressData(code, "ward");
      form.setValue("wardId", 0);

      onTabChangeDefault("wardId");
    } else if (fieldName === "wardId") {
      setOpen(false);
    }
  };

  const onTabChangeDefault = useCallback(
    (tab: string) => {
      setTabContentAddress(tab as AddressIdType);
      switch (tab as AddressIdType) {
        case "provinceId":
          fetchAddressData("null", "province");
          break;
        case "districtId":
          const province = addressData.province.find(
            (address) => address.id === form.getValues("provinceId")
          );
          if (province) {
            fetchAddressData(province.code, "district");
          }
          break;
        case "wardId":
          const district = addressData.district.find(
            (address) => address.id === form.getValues("districtId")
          );
          if (district) {
            fetchAddressData(district.code, "ward");
          }
          break;
        default:
          break;
      }
    },
    [addressData, fetchAddressData, form]
  );

  const getAddressDisplay = () => {
    const province = addressData.province.find(
      (province) => province.id === form.getValues("provinceId")
    );
    if (!province) return "Tỉnh/Thành phố, Quận/Huyện, Phường/Xã";

    const district = addressData.district.find(
      (district) => district.id === form.getValues("districtId")
    );
    const ward = addressData.ward.find(
      (ward) => ward.id === form.getValues("wardId")
    );

    const addressDisplay: string[] = [province.name];

    if (district)
      addressDisplay.push(
        BaseUtil.formatAddressName(district.type, district.name)
      );
    if (ward)
      addressDisplay.push(BaseUtil.formatAddressName(ward.type, ward.name));

    return addressDisplay.join(", ");
  };

  const renderErrorMessages = () => {
    const {
      formState: { errors },
    } = form;
    const errorMessages = [];
    if (errors.provinceId) errorMessages.push(errors.provinceId.message);
    if (errors.districtId) errorMessages.push(errors.districtId.message);
    if (errors.wardId) errorMessages.push(errors.wardId.message);

    if (errorMessages.length > 0) {
      return (
        <span className="text-red-500 text-xs">
          Vui lòng chọn{" "}
          {errorMessages.map((message, index) => (
            <Fragment key={index}>
              {index > 0 && index < errorMessages.length - 1 && ", "}
              {index > 0 && index === errorMessages.length - 1 && " và "}
              {message}
            </Fragment>
          ))}
        </span>
      );
    }
    return null;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="w-full p-2 flex justify-between items-center text-muted-foreground text-sm border rounded-md">
        {getAddressDisplay()}
        <ChevronDown size={18} />
      </DropdownMenuTrigger>
      {renderErrorMessages()}
      <DropdownMenuContent className="w-[460px] p-0 flex py-0">
        <Tabs
          value={tabContentAddress}
          onValueChange={onTabChangeDefault}
          className="w-full"
        >
          <TabsList className="w-full rounded-none">
            <TabsTrigger value="provinceId" className="w-full">
              Tỉnh/Thành phố
            </TabsTrigger>
            <TabsTrigger
              value="districtId"
              className="w-full"
              disabled={form.getValues("provinceId") === 0}
            >
              Quận/Huyện
            </TabsTrigger>
            <TabsTrigger
              value="wardId"
              className="w-full"
              disabled={form.getValues("districtId") === 0}
            >
              Phường/Xã
            </TabsTrigger>
          </TabsList>
          <Input
            value={searchValue}
            placeholder="Tìm kiếm"
            className="h-10 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none border-b border-x-0 border-t-0 fixed z-10"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <TabsContent value={"provinceId"} className="mt-0 flex flex-col">
            <ScrollArea className="h-72 mt-10">
              {addressData.province.map(
                ({ id, name }) =>
                  BaseUtil.filterAddress(searchValue, name) && (
                    <div
                      key={id}
                      onClick={() =>
                        handleSelectAddress("provinceId", id, name)
                      }
                      className={cn("p-2 hover:bg-gray-100 cursor-pointer", {
                        "text-primary pointer-events-none":
                          form.getValues("provinceId") === id,
                      })}
                    >
                      {name}
                    </div>
                  )
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value={"districtId"} className="mt-0 flex flex-col">
            <ScrollArea className="h-72 mt-10">
              {addressData.district.map(
                ({ id, name }) =>
                  BaseUtil.filterAddress(searchValue, name) && (
                    <div
                      key={id}
                      onClick={() =>
                        handleSelectAddress("districtId", id, name)
                      }
                      className={cn("p-2 hover:bg-gray-100 cursor-pointer", {
                        "text-primary pointer-events-none":
                          form.getValues("districtId") === id,
                      })}
                    >
                      {name}
                    </div>
                  )
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value={"wardId"} className="mt-0 flex flex-col">
            <ScrollArea className="h-72 mt-10">
              {addressData.ward.map(
                ({ id, name }) =>
                  BaseUtil.filterAddress(searchValue, name) && (
                    <div
                      key={id}
                      onClick={() => handleSelectAddress("wardId", id, name)}
                      className={cn("p-2 hover:bg-gray-100 cursor-pointer", {
                        "text-primary pointer-events-none":
                          form.getValues("wardId") === id,
                      })}
                    >
                      {name}
                    </div>
                  )
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
