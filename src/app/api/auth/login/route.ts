import connectWithMongo from "@/app/lib/mongoConnection/mongoConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {email, password} = await req.json();

        //! If not of email and password then sending error
        if (!email || !password) {
            return NextResponse.json({ error: "Invalid criteria"}, {status: 401});
        }

        await connectWithMongo();
        
        return NextResponse.json({
            data: "ok",
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server error"}, {status: 500});
    }
};