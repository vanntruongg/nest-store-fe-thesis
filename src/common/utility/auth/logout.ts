import { redirect } from "next/navigation";
import { tokenStorage } from "./token-storage";
import { ROUTES } from "~/common/constants/routes";

export const handleLogout = async (options: any) => {
  if (typeof window !== "undefined") {
    await fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({ force: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    tokenStorage.clearToken();

    location.href = ROUTES.AUTH.LOGIN;
  } else {
    const accessToken = (options?.headers as any).Authorization.split(" ")[1];
    redirect(`/logout?accesstoken=${accessToken}`);
  }
};
