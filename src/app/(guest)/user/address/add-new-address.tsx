import { useState } from "react";
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
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressShema,
  AddressShemaType,
} from "~/app/schema-validations/address.shema";
import Loading from "~/components/loading";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { AddressData } from "~/components/address-data";

export interface IAddNewAddressProps {}

export function AddNewAddress(props: IAddNewAddressProps) {
  // const [name, setName] = useState<string>("");
  // const [phone, setPhone] = useState<string>("");
  // const [wardId, setWardId] = useState<number>(0);
  // const [districtId, setDistrictId] = useState<number>(0);
  // const [provinceId, setProvinceId] = useState<number>(0);
  // const [street, setStreet] = useState<string>("");
  // const [isDefault, setIsDefault] = useState<boolean>(false);
  // const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<AddressShemaType>({
    resolver: zodResolver(AddressShema),
    defaultValues: {
      name: "",
      phone: "",
      wardId: 0,
      districtId: 0,
      provinceId: 0,
      street: "",
      isDefault: false,
    },
  });

  const onSubmit = async (addressShema: AddressShemaType) => {
    if (loading) return;
    setLoading(true);
    try {
      console.log("data: ", addressShema);

      // const {
      //   payload: { message, success },
      // } = await userAddressApi.createAddress(newAddress);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      {loading && <Loading />}
      <AlertDialogTrigger className="py-2 px-4 flex items-center space-x-2 bg-primary text-white text-sm">
        <Plus size={20} />
        <span>Thêm địa chỉ mới</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="top-[40%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Địa chỉ mới</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Họ và tên"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Số điện thoại"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <AddressData form={form} />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Địa chỉ cụ thể"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isDefault"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor="isDefault" className="cursor-pointer">
                        Đặt làm địa chỉ mặt định
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <AlertDialogFooter>
          <AlertDialogCancel>Trở lại</AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
            Hoàn thành
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
