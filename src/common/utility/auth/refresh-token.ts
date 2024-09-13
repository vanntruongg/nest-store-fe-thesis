import authApi from "~/apis/auth-api";
import { tokenStorage } from "./token-storage";
import { BaseUtil } from "../base.util";
import { handleLogout } from "./logout";
import { toast } from "~/common/components/ui/use-toast";

export const refreshToken = async (options: any) => {
  try {
    console.log("refresh token");

    const refreshToken = tokenStorage.value.rawToken.refreshToken;

    const result = await authApi.refreshToken(refreshToken);
    console.log("result refresh token: ", result);

    tokenStorage.value.rawToken.accessToken = result.payload.data.accessToken;

    await authApi.auth(result.payload.data);
    return true;
  } catch (error) {
    toast({
      description: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      variant: "destructive",
      duration: 3000,
    });
    handleLogout(options);
    BaseUtil.handleErrorApi({ error });
    return false;
  }
};
