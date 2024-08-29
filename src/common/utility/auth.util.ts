import { tokenStorage } from "./auth/token-storage";

export class AuthUtil {
  static isLogin() {
    const accessToken = tokenStorage.value.rawToken.accessToken;
    return accessToken !== "";
  }
}
