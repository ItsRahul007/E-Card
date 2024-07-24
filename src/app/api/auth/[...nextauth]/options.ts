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
        function generateAndSaveAuthToken({
          id,
          name,
          userRole,
          brandName,
          avatar,
        }: {
          id: string;
          name: string;
          userRole: string;
          brandName?: string;
          avatar?: string;
        }) {
          const data = {
            user: {
              id,
              name,
              userRole,
              brandName,
              avatar,
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

            if (!user || user === null) {
              const newUser = await User.create({
                name: profile.name,
                email: profile.email,
                avatar: profile.picture,
                socialUser: true,
              });

              generateAndSaveAuthToken({
                id: newUser._id,
                name: newUser.name,
                userRole: newUser.userRole,
                avatar: newUser.avatar,
              });
            }
            user.avatar = profile.picture;
            await user.save();

            generateAndSaveAuthToken({
              id: user._id,
              name: user.name,
              userRole: user.userRole,
              brandName: user.brandName,
              avatar: user.avatar,
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
