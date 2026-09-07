// proxy

// next
import { NextRequest, NextResponse, ProxyConfig } from "next/server";

// middleware
import traceProxy, { SESSION_ID_KEY, CLIENT_ID_KEY } from "./middleware/proxy/trace";
import localeProxy from "./middleware/proxy/locale";

// next-intl
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// 代理劫持
export async function proxy( request: NextRequest ) {
    // trace
    const { sessionId, clientId } = await traceProxy( request );    // trace上下文

    // locate
    const { locale } = await localeProxy( request );  // 当前语言

    // 存储header上下文
    const requestHeaders = new Headers( request.headers );
    requestHeaders.set( SESSION_ID_KEY, sessionId );
    requestHeaders.set( CLIENT_ID_KEY, clientId );
    requestHeaders.set( 'x-app-locale', locale )

    // response
    const response = NextResponse.next( {
        request: {
            headers: requestHeaders
        }
    } );

    // 存储cookie
    response.cookies.set( { // session id
        name: SESSION_ID_KEY,
        value: sessionId,
        // httpOnly: true,
        sameSite: 'lax',
        path: '/',
    } );
    response.cookies.set( CLIENT_ID_KEY, clientId );    // client id

    // 响应
    return response;
}

// 配置
export default createMiddleware( routing );
export const config: ProxyConfig = {
    matcher: [
        // allow routes
        '/home/:path*',
        '/user/:path*',
        '/:locale/home/:path*',
        '/:locale/user/:path*',
    ]
};