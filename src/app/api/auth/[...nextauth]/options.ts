import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { getDateFromNumber } from "@/lib/util/checkAuth";
import { sign } from "jsonwebtoken";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

type T_GenerateAndSaveAuthTokenProps = {
  id: string;
  name: string;
  userRole: string;
  brandName?: string;
  avatar?: string;
  isVerified: boolean;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        function generateAndSaveAuthToken({
          id,
          name,
          userRole,
          brandName,
          avatar,
          isVerified = false,
        }: T_GenerateAndSaveAuthTokenProps) {
          const data = {
            user: {
              id,
              name,
              userRole,
              brandName,
              avatar,
              isVerified,
            },
          };
          const JWT_SECRET: string = process.env.JWT_SECRET!;
          const authToken = sign(data, JWT_SECRET, {
            expiresIn: 60 * 60 * 24 * 5,
          });

          cookies().set("authToken", authToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 5,
          });
        }

        if (profile) {
          try {
            await connectWithMongo();
            const user = await User.findOne({ email: profile.email });

            const coupon = {
              coupon_name: "First order discount",
              coupon_code: "first-order",
              coupon_discount: 10,
              starts_on: getDateFromNumber(0),
              ends_on: getDateFromNumber(15),
              is_active: true,
            };

            if (!user || user === null) {
              const newUser = await User.create({
                name: profile.name,
                email: profile.email,
                avatar: profile.picture,
                socialUser: true,
                isVerified: true,
                coupons: [coupon],
              });

              generateAndSaveAuthToken({
                id: newUser._id,
                name: newUser.name,
                userRole: newUser.userRole,
                avatar: newUser.avatar,
                isVerified: true,
              });
            }
            user.avatar = profile.picture;
            user.isVerified = true;
            await user.save();

            generateAndSaveAuthToken({
              id: user._id,
              name: user.name,
              userRole: user.userRole,
              brandName: user.brandName,
              avatar: user.avatar,
              isVerified: true,
            });
          } catch (error: any) {
            console.log(error.message);
          }
        }

        return profile;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
