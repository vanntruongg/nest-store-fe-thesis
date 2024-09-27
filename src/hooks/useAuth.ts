import { jwtDecode } from "jwt-decode";
import { UserRole } from "~/common/utility/enum.util";
import { JWTDecoded } from "~/modules/auth/model/AuthModel";

export const useAuth = () => {
  const isAdmin = (accessToken: string) => {
    const tokenDecoded: JWTDecoded = jwtDecode(accessToken);
    return tokenDecoded.roles.includes(UserRole.ADMIN);
  };

  const isEmployee = (accessToken: string) => {
    const tokenDecoded: JWTDecoded = jwtDecode(accessToken);
    return tokenDecoded.roles.includes(UserRole.EMPLOYEE);
  };

  return { isAdmin, isEmployee };
};
