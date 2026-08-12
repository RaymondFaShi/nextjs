// proxy

// next
import { NextRequest, NextResponse, ProxyConfig } from "next/server";

// middleware
import traceProxy from "./middleware/proxy/trace";

// 代理劫持
export async function proxy( request: NextRequest ) {
    // response
    const response = NextResponse;

    // trace
    // traceProxy( request, response );
    const requestHeaders = new Headers( request.headers )

    requestHeaders.set( 'x-trace-id', crypto.randomUUID() );

    return response.next( {
        request: {
            headers: requestHeaders,
        },
    } );

    // return response;
}

// 配置
export const config: ProxyConfig = {
    matcher: [
        // allow routes
        '/home/:path*',
    ]
};