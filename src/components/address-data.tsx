import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import addressDataApi from "~/apis/address-data-api";
import {
  Address,
  AddressDetails,
  AddressType,
  LocationFieldType,
  LocationType,
} from "~/common/model/address.model";

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
import { ScrollArea } from "./ui/scroll-area";

export interface IAddressDataProps {
  address: string;
  tempAddress: Address;
  setTempAddress: Dispatch<SetStateAction<Address>>;
}

export function AddressData({
  form,
}: {
  form: UseFormReturn<AddressShemaType>;
}) {
  const [addressData, setAddressData] = useState<
    Record<LocationType, AddressDetails[]>
  >({
    province: [],
    district: [],
    ward: [],
  });
  const [tabContentAddress, setTabContentAddress] =
    useState<LocationFieldType>("provinceId");

  const [open, setOpen] = useState<boolean>(false);

  const fetchAddressData = async (
    parentCode: string | null,
    type: LocationType
  ) => {
    const result = await addressDataApi.getAddressDataByParentCode(parentCode);
    setAddressData((prev) => ({
      ...prev,
      [type]: result.payload.data,
    }));
  };

  useEffect(() => {
    fetchAddressData(null, "province");

    return () => {
      form.setValue("provinceId", 0);
      form.setValue("districtId", 0);
      form.setValue("wardId", 0);
    };
  }, []);

  const handleSelectAddress = useCallback(
    (fieldName: LocationFieldType, addressId: number, code: string) => {
      form.setValue(fieldName, addressId);
      form.clearErrors(fieldName);
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
    },
    [fetchAddressData, form]
  );

  const onTabChangeDefault = useCallback(
    (tab: string) => {
      setTabContentAddress(tab as LocationFieldType);
      switch (tab as LocationFieldType) {
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
      <DropdownMenuContent className="w-[460px] p-0 flex space-x-2">
        <Tabs
          value={tabContentAddress}
          onValueChange={onTabChangeDefault}
          className="w-full"
        >
          <TabsList className="w-full">
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
          <TabsContent value={"provinceId"} className="">
            <ScrollArea className="h-72">
              {addressData.province.map(({ id, name, type, code }) => (
                <div
                  key={id}
                  onClick={() => handleSelectAddress("provinceId", id, name)}
                  className={cn("p-2 hover:bg-gray-100 cursor-pointer", {
                    "text-primary pointer-events-none":
                      form.getValues("provinceId") === id,
                  })}
                >
                  {name}
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value={"districtId"} className="">
            <ScrollArea className="h-72">
              {addressData.district.map(({ id, name, type, code }) => (
                <div
                  key={id}
                  onClick={() => handleSelectAddress("districtId", id, name)}
                  className={cn("p-2 hover:bg-gray-100 cursor-pointer", {
                    "text-primary pointer-events-none":
                      form.getValues("districtId") === id,
                  })}
                >
                  {name}
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value={"wardId"} className="">
            <ScrollArea className="h-72">
              {addressData.ward.map(({ id, name, type, code }) => (
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
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
