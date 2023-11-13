import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    return Response.json({ hello: "world" }, { status: 200 });
}
