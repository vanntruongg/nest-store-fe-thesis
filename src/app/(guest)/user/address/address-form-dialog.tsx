import { ReactNode, useEffect, useState } from "react";
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
import { AddressData } from "~/components/address/address-data";
import userAddressApi from "~/apis/user-address";
import { toast } from "~/components/ui/use-toast";
import {
  Address,
  AddressAction,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "~/common/model/address.model";
import { useUser } from "~/hooks/useUser";

export interface IAddressFormDialogProps {
  action: AddressAction;
  title: string;
  address?: Address;
  fetchData: () => void;
  children: ReactNode;
}

export function AddressFormDialog({
  action,
  title,
  address,
  fetchData,
  children,
}: IAddressFormDialogProps) {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<AddressShemaType>({
    resolver: zodResolver(AddressShema),
    defaultValues: {
      name: address?.name ?? "",
      phone: address?.phone ?? "",
      wardId: address?.ward.id ?? 0,
      districtId: address?.district.id ?? 0,
      provinceId: address?.province.id ?? 0,
      street: address?.street ?? "",
      isDefault: address?.default ?? false,
    },
  });

  const onSubmit = async (data: AddressShemaType) => {
    if (loading) return;
    setLoading(true);
    try {
      if (!BaseUtil.checkPhoneAndSetErrorForm(data.phone, form.setError))
        return;
      let message = "";
      if (action === AddressAction.CREATE) {
        const dataCreate: CreateAddressRequest = {
          ...data,
          userEmail: user.email,
        };

        const res = await userAddressApi.createAddress(dataCreate);
        message = res.payload.message;
      } else if (action === AddressAction.UPDATE) {
        if (address) {
          const dataUpdate: UpdateAddressRequest = {
            id: address?.id,
            ...data,
            userEmail: user.email,
          };

          const res = await userAddressApi.updateAddress(dataUpdate);
          message = res.payload.message;
        }
      }

      fetchData();

      toast({ description: message });
      setOpen(false);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {loading && <Loading />}
      <AlertDialogTrigger asChild className="self-start">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="top-[40%]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
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
            <AddressData
              form={form}
              action={action}
              ward={address?.ward}
              district={address?.district}
              province={address?.province}
            />
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
            {action === AddressAction.CREATE && (
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
                        <FormLabel
                          htmlFor="isDefault"
                          className="cursor-pointer"
                        >
                          Đặt làm địa chỉ mặt định
                        </FormLabel>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}
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
