import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ envFile: process.env.URL_COLLECTION_NAME });
}