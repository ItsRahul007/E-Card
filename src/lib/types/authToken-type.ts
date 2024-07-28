export type authTokenType = {
  user: {
    id: string;
  };
};

export type T_JwtVerifyDataType = {
  user: {
    id: string;
    name: string;
    isVerified: boolean;
    userRole?: "seller" | "user" | "admin";
    brandName?: string;
    avatar?: string;
  };
  iat: number | string;
};
