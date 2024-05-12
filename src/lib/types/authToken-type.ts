export type authTokenType = {
    user: {
        id: string
    }
};

export type T_JwtVerifyDataType = {
    user: {
        id: String;
        name: String;
    },
    iat: number | string
};