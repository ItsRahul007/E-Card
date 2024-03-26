export type authTokenType = {
    user: {
        id: string
    }
};

export type T_JwtVerifyDataType = {
    user: {
        id: String
    },
    iat: number | string
};