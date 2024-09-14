"use client";
import { ReactNode, useEffect, useState } from "react";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { useUser } from "~/hooks/useUser";
import { AuthResponse } from "~/modules/auth/model/AuthModel";

export default function AppTokenProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken: AuthResponse;
}) {
  const { clearUser } = useUser();
  const [isCleared, setIsCleared] = useState(false);

  useState(() => {
    if (typeof window !== "undefined") {
      tokenStorage.value.rawToken.accessToken = initialToken.accessToken;
      tokenStorage.value.rawToken.refreshToken = initialToken.refreshToken;
    }
  });

  const accessToken = tokenStorage.value.rawToken.accessToken;

  // / clear use tránh trường hợp không login thì thông tin user vẫn còn
  useEffect(() => {
    if (accessToken === "" && !isCleared) {
      clearUser();
      setIsCleared(true); // Đặt flag sau khi clearUser được gọi
    }
  }, [accessToken, isCleared]);

  return <>{children}</>;
}
