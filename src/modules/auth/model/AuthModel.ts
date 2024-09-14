export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type BaseAuthToken = {
  sub: string;
  iat: number;
  exp: number | 0;
};

export type JWTDecoded = {
  sub: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
};

export type TokenStorage = {
  decodedAccessToken: BaseAuthToken;
  decodedRefreshToken: BaseAuthToken;
  rawToken: AuthResponse;
};

export type ResetPassword = {
  token: string;
  newPassword: string;
};
