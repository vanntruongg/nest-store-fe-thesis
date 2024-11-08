"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  ChangePasswordShema,
  TChangePasswordShema,
} from "~/app/schema-validations/auth.shema";
import { BaseUtil } from "~/common/utility/base.util";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { ROUTES } from "~/common/constants/routes";
import { ChangePassword } from "~/modules/user/model/ChangePassword";
import { changePassword } from "~/modules/user/services/UserService";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<TChangePasswordShema>({
    resolver: zodResolver(ChangePasswordShema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePassword) => {
    try {
      const result = await changePassword(data.oldPassword, data.newPassword);
      toast({ description: result.message });
      router.push(ROUTES.USER.PROFILE);
    } catch (error) {
      BaseUtil.handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-white rounded-sm">
      <div className="border-b pb-4">
        <h1 className="text-xl font-medium">Đổi mật khẩu</h1>
        <p className="text-base text-muted-foreground">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <div className="max-w-2xl min-w-[600px] mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="col-span-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => {
                return (
                  <div>
                    <FormLabel>Mật khẩu cũ</FormLabel>
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showOldPassword ? "text" : "password"}
                            {...field}
                          />
                          <div
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {showOldPassword ? (
                              <Eye strokeWidth={1.5} size={18} />
                            ) : (
                              <EyeOff strokeWidth={1.5} size={18} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  </div>
                );
              }}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => {
                return (
                  <div>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            {...field}
                          />
                          <div
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {showNewPassword ? (
                              <Eye strokeWidth={1.5} size={18} />
                            ) : (
                              <EyeOff strokeWidth={1.5} size={18} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  </div>
                );
              }}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <div>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                          />
                          <div
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <Eye strokeWidth={1.5} size={18} />
                            ) : (
                              <EyeOff strokeWidth={1.5} size={18} />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  </div>
                );
              }}
            />

            <Button onClick={form.handleSubmit(onSubmit)}>Lưu thay đổi</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
