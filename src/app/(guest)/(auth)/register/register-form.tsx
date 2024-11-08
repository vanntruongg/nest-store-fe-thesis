"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterShema,
  RegisterShemaType,
} from "~/app/schema-validations/auth.shema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "~/common/components/loading";
import { toast } from "~/components/ui/use-toast";
import { register } from "~/modules/auth/services/AuthService";
import { BaseUtil } from "~/common/utility/base.util";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterShemaType>({
    resolver: zodResolver(RegisterShema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterShemaType) => {
    setLoading(true);
    try {
      const result = await register({
        firstName,
        lastName,
        email,
        password,
      });

      toast({ description: result.payload.message });

      if (result.payload.success) {
        router.push("/");
      }
    } catch (error) {
      BaseUtil.handleErrorApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Vd: vantruong@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Mật khẩu"
                          {...field}
                        />
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                          {showPassword ? (
                            <Eye strokeWidth={1.5} size={18} />
                          ) : (
                            <EyeOff strokeWidth={1.5} size={18} />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                </>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <>
                  <FormLabel>Xác nhận mật khẩu</FormLabel>
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Xác nhận mật khẩu"
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
                </>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
