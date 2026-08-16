// trace proxy

// next
import { NextRequest, NextResponse } from "next/server";

// 链式追踪key
const clientHeaderKey = 'x-client-id';  // client id

const traceProxy: Middleware.Proxy = async ( request: NextRequest ) => {
    // 从报头获取clientId
    let clientId = request.headers.get( clientHeaderKey );

    // 如果没有自行生成clientId
    if( !clientId ) {
        clientId = crypto.randomUUID();
    }

    // 返回上文
    const requestHeaders = new Headers( request.headers );
    requestHeaders.set( clientHeaderKey, clientId );

    return {
        clientId,
        ctx: {
            request: {
                headers: requestHeaders
            }
        }
    };
};

export default traceProxy;