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

// interface AuthContextType {
//   tokenStorage: AuthResponse;
//   setAuthData: (authData: AuthResponse) => void;
//   clearAuthData: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [tokenStorage, setTokenStorage] = useState<AuthResponse>({
//     accessToken: "",
//     refreshToken: "",
//   });

//   const setAuthData = (authData: AuthResponse) => {
//     setTokenStorage(authData);
//   };

//   const clearAuthData = () => {
//     setTokenStorage({
//       accessToken: "",
//       refreshToken: "",
//     });
//   };

//   return <AuthContext.Provider value={{ tokenStorage, setAuthData, clearAuthData }}>
//     {children}
//   </AuthContext.Provider>;
// };
