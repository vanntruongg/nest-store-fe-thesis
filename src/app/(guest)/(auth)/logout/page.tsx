"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "~/common/constants/routes";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { BaseUtil } from "~/common/utility/base.util";
import { useUser } from "~/hooks/useUser";
import { logoutFromNextClientToNextServer } from "~/modules/auth/services/AuthService";

const Logout = () => {
  const router = useRouter();
  const { clearUser } = useUser();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    const handleLogout = async () => {
      if (accessToken === tokenStorage.value.rawToken.accessToken) {
        try {
          await logoutFromNextClientToNextServer(true);
          clearUser();
          tokenStorage.clearToken();
          router.push(ROUTES.AUTH.LOGIN);
        } catch (error) {
          BaseUtil.handleErrorApi({ error });
        }
      }
    };
    handleLogout();
  }, [accessToken, router, clearUser]);
};

export default Logout;
