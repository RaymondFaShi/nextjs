// proxy

// next
import { NextRequest, NextResponse } from "next/server";

// middleware
import traceProxy from "./middleware/proxy/trace";

// 代理劫持
export async function proxy( request: NextRequest ) {
    // response
    const response = NextResponse.next();

    // trace
    traceProxy( request, response );


    return response;
}

// 配置
export const config = {
    matcher: [
        // allow routes
        '/home/:path*',
    ]
};