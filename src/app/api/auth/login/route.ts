import connectWithMongo from "@/app/lib/mongoConnection/mongoConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        //! how to add checks in req, like if the request have name or email or not
        await connectWithMongo();
        const data = await req.json();
        
        return NextResponse.json({
            data
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "error"}, {status: 500});
    }
};