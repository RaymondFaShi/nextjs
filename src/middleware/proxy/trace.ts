// trace proxy

// next
import { NextRequest, NextResponse } from "next/server";

// 链式追踪key
const SESSION_ID_KEY = 'x-session-id';  // session id
const CLIENT_ID_KEY = 'x-client-id';  // client id

const traceProxy: Middleware.Proxy = async ( request: NextRequest ) => {
    // 获取clientId
    let clientId = request.headers.get( CLIENT_ID_KEY );    // 从报头获取clientId
    if( !clientId ) {   // 如果没有自行生成clientId
        clientId = crypto.randomUUID();
    }

    // 获取sessionId
    let sessionId = request.cookies.get( SESSION_ID_KEY )?.value;  // 从cookie获取sessionId
    if( !sessionId ) {
        sessionId = crypto.randomUUID();
    }

    // 返回上文
    const requestHeaders = new Headers( request.headers );
    requestHeaders.set( SESSION_ID_KEY, sessionId );
    requestHeaders.set( CLIENT_ID_KEY, clientId );

    return {
        sessionId,
        clientId,
        ctx: {
            request: {
                headers: requestHeaders
            }
        }
    };
};

export default traceProxy;
export {
    SESSION_ID_KEY,
    CLIENT_ID_KEY,
}