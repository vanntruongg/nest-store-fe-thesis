import { User } from "~/modules/user/model/User";
import { tokenStorage } from "./auth/token-storage";

export class AuthUtil {
  static isLogin() {
    const accessToken = tokenStorage.value.rawToken.accessToken;
    return accessToken !== "";
  }

  static getUserRoles(user: User) {
    return user.roles.map((role) => role.name);
  }
}
