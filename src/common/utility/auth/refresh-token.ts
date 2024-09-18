import { BaseUtil } from "../base.util";
import { handleLogout } from "./logout";
import { toast } from "~/components/ui/use-toast";
import { auth, handleRefreshToken } from "~/modules/auth/services/AuthService";
import { tokenStorage } from "./token-storage";

export const refreshToken = async (options: any) => {
  try {
    console.log("refresh token");
    const refreshToken = tokenStorage.value.rawToken.refreshToken;

    const result = await handleRefreshToken(refreshToken);
    console.log("result refresh token: ", result);

    tokenStorage.value.rawToken.accessToken = result.data.accessToken;

    await auth(result.data);
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
