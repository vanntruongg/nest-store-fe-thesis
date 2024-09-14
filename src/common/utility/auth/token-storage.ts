import { jwtDecode } from "jwt-decode";
import {
  AuthResponse,
  BaseAuthToken,
  TokenStorage,
} from "~/modules/auth/model/AuthModel";

const initialBaseAuthToken: BaseAuthToken = {
  sub: "",
  iat: 0,
  exp: 0,
};

class AuthToken {
  private tokenStorage: TokenStorage = {
    decodedAccessToken: initialBaseAuthToken,
    decodedRefreshToken: initialBaseAuthToken,
    rawToken: {
      accessToken: "",
      refreshToken: "",
    },
  };

  get value(): TokenStorage {
    return this.tokenStorage;
  }

  set value(authData: AuthResponse) {
    if (typeof window === "undefined") {
      throw new Error("Can't set token on server side");
    }
    const decodedAT = jwtDecode<BaseAuthToken>(authData.accessToken);
    const decodedRF = jwtDecode<BaseAuthToken>(authData.refreshToken);
    this.tokenStorage = {
      decodedAccessToken: decodedAT,
      decodedRefreshToken: decodedRF,
      rawToken: authData,
    };
  }

  public clearToken() {
    this.tokenStorage = {
      decodedAccessToken: initialBaseAuthToken,
      decodedRefreshToken: initialBaseAuthToken,
      rawToken: {
        accessToken: "",
        refreshToken: "",
      },
    };
  }
}

export const tokenStorage = new AuthToken();
