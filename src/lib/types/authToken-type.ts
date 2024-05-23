export type authTokenType = {
    user: {
        id: string
    }
};

export type T_JwtVerifyDataType = {
    user: {
        id: string;
        name: string;
        userRole?: 'seller' | 'user' | 'admin';
    },
    iat: number | string
};