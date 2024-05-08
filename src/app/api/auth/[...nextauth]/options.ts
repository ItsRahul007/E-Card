import User from "@/lib/model/usersSchema";
import connectWithMongo from "@/lib/mongoConnection/mongoConnect";
import { sign } from "jsonwebtoken";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// create a function which will return this type of date(2023-03-08T12:00:00.000Z) and the date should be current date + 5 days
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            async profile(profile) {
                function generateAndSaveAuthToken(id: string, name: string) {
                    const data = {
                        user: {
                            id
                        }
                    };
                    const JWT_SECRET: string = process.env.JWT_SECRET!;
                    const authToken = sign(data, JWT_SECRET!);
                    const setCookies = cookies().set;

                    setCookies('authToken', authToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 5 });
                    setCookies("userName", name, { maxAge: 60 * 60 * 24 * 5, httpOnly: true });
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
                                socialUser: true
                            });

                            generateAndSaveAuthToken(newUser._id, newUser.name);
                        };

                        generateAndSaveAuthToken(user._id, user.name)

                    } catch (error: any) {
                        console.log(error.message)
                    }
                };

                return profile;
            },
        })
    ],
    pages: {
        signIn: '/login'
    }
});