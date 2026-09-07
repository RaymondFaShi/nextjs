// trace proxy

// next
import { NextRequest } from "next/server";

// 链式追踪key
const SESSION_ID_KEY = 'x-session-id';  // session id
const CLIENT_ID_KEY = 'x-client-id';  // client id

// interface
interface TraceResult {
    sessionId: string;
    clientId: string;
}

const traceProxy: Middleware.Proxy<TraceResult> = async ( request: NextRequest ) => {
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

    return {
        sessionId,
        clientId,
    };
};

export default traceProxy;
export {
    SESSION_ID_KEY,
    CLIENT_ID_KEY,
}