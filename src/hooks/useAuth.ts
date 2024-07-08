import { jwtDecode } from "jwt-decode";
import { IJWTDecoded } from "~/common/model/auth.model";
import { UserRole } from "~/common/utility/enum.util";

export const useAuth = () => {
  const isAdmin = (accessToken: string) => {
    const tokenDecoded: IJWTDecoded = jwtDecode(accessToken);
    console.log(tokenDecoded.roles);

    return tokenDecoded.roles.includes(UserRole.ADMIN);
  };

  return { isAdmin };
};
