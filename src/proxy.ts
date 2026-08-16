// proxy

// next
import { NextRequest, NextResponse, ProxyConfig } from "next/server";

// middleware
import traceProxy from "./middleware/proxy/trace";

// 代理劫持
export async function proxy( request: NextRequest ) {
    // trace
    const { clientId, ctx } = await traceProxy( request );    // trace上下文

    // response
    const response = NextResponse.next( ctx );

    // 存储cookie
    response.cookies.set( 'x-client-id', clientId );

    // 响应
    return response;
}

// 配置
export const config: ProxyConfig = {
    matcher: [
        // allow routes
        '/home/:path*',
        '/user/:path*',
    ]
};