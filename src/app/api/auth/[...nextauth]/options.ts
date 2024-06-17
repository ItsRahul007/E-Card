import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { sign } from "jsonwebtoken";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        function generateAndSaveAuthToken(
          id: string,
          name: string,
          userRole: string,
          brandName?: string
        ) {
          const data = {
            user: {
              id,
              name,
              userRole,
              brandName,
            },
          };
          const JWT_SECRET: string = process.env.JWT_SECRET!;
          const authToken = sign(data, JWT_SECRET!);
          const setCookies = cookies().set;

          setCookies("authToken", authToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 5,
          });
        }

        if (profile) {
          try {
            await connectWithMongo();
            const user = await User.findOne({ email: profile.email });

            if (!user || user === null) {
              const newUser = await User.create({
                name: profile.name,
                email: profile.email,
                avatar: profile.picture,
                socialUser: true,
              });

              generateAndSaveAuthToken(
                newUser._id,
                newUser.name,
                newUser.userRole
              );
            }

            generateAndSaveAuthToken(
              user._id,
              user.name,
              user.userRole,
              user.brandName
            );
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
