"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  UpdateUserShema,
  UpdateUserShemaType,
} from "~/app/schema-validations/auth.shema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ERole, UserRole } from "~/common/utility/enum.util";

import Loading from "~/common/components/loading";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/common/components/icon-text-loading";
import { UserPut } from "~/modules/user/model/UserPut";
import { FileWithPreview } from "~/modules/common/model/FileWithPreview";
import { User } from "~/modules/user/model/User";
import { uploadToCloudinary } from "~/modules/common/services/CloudinaryService";
import { ImagePreviewUploader } from "~/common/components/image/image-preview-uploader";

interface IFormUpdateUserProps {
  user: User;
  updateUser: (userPut: UserPut) => void;
}

export function FormUpdateUser({ user, updateUser }: IFormUpdateUserProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState(user.imageUrl || "");
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );

  const listRoleName = user.roles.map((role) => role.name);
  const form = useForm<UpdateUserShemaType>({
    resolver: zodResolver(UpdateUserShema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
      imageUrl: user.imageUrl || "",
      roles: listRoleName,
    },
  });

  const onSubmit = async ({
    firstName,
    lastName,
    phone,
    imageUrl,
    roles,
  }: UpdateUserShemaType) => {
    setLoading(true);

    try {
      // check valid if phone not empty
      if (!BaseUtil.checkPhoneAndSetErrorForm(phone, form.setError)) {
        return;
      }

      // handle upload image and get url
      if (imageSelected) {
        imageUrl = await uploadToCloudinary(imageSelected);
      } else {
        imageUrl = user.imageUrl;
      }

      const userPut: UserPut = {
        email: user.email,
        firstName,
        lastName,
        phone,
        imageUrl,
        roles,
      };

      updateUser(userPut);
      setOpen(false);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckRole = (checked: CheckedState, role: string, field: any) => {
    if (!checked) {
      const updatedValue = field.value.filter(
        (value: string) => value !== role
      );
      form.setValue(field.name, updatedValue);
    } else {
      field.value.push(role);
      form.setValue(field.name, field.value);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {loading && <Loading />}
        <DialogTrigger asChild className="p-1.5 rounded-sm hover:bg-gray-100">
          <div
            className="w-full text-sm cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Sửa
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Cập nhật tài khoản người dùng</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-6 space-x-16">
            <div className="col-span-2 flex flex-col space-y-4">
              <ImagePreviewUploader
                form={form}
                imageSelected={imageSelected}
                setImageSelected={setImageSelected}
                image={user.imageUrl}
                className="w-1/2"
              />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="col-span-4 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input placeholder="Vd: Trần" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Vd: Văn Trường" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Vd: 0357 888 999"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex items-center space-x-2 ">
                        <FormLabel className=" leading-none">
                          Vai trò:
                        </FormLabel>
                        <FormControl className="h-full ">
                          <div className="flex items-center space-x-2 ">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={UserRole.ADMIN}
                                {...field}
                                checked={field.value.includes(UserRole.ADMIN)}
                                onCheckedChange={(e) =>
                                  handleCheckRole(e, UserRole.ADMIN, field)
                                }
                              />
                              <Label
                                htmlFor={UserRole.ADMIN}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {ERole.ADMIN}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={UserRole.EMPLOYEE}
                                {...field}
                                checked={field.value.includes(
                                  UserRole.EMPLOYEE
                                )}
                                onCheckedChange={(e) =>
                                  handleCheckRole(e, UserRole.EMPLOYEE, field)
                                }
                              />
                              <Label
                                htmlFor={UserRole.EMPLOYEE}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {ERole.EMPLOYEE}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={UserRole.USER}
                                {...field}
                                checked={field.value.includes(UserRole.USER)}
                                onCheckedChange={(e) =>
                                  handleCheckRole(e, UserRole.USER, field)
                                }
                              />
                              <Label
                                htmlFor={UserRole.USER}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {ERole.USER}
                              </Label>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    );
                  }}
                />
              </form>
            </Form>
          </div>
          <DialogFooter>
            {loading ? (
              <Button variant={"outline"}>
                <IconTextLoading />
              </Button>
            ) : (
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Lưu thay đổi
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
