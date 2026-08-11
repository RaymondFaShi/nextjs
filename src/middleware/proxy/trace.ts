// trace proxy

// next
import { NextRequest, NextResponse } from "next/server";

export default async function traceProxy( request: NextRequest, response: NextResponse ) {
    // traceId header key
    const traceIdHeaderKey: string = 'x-trace-id';

    // 从报头获取traceId
    let traceId = request.headers.get( traceIdHeaderKey );

    // 如果没有自行生成
    if( !traceId ) {
        traceId = crypto.randomUUID();
    }
    // log( traceId );
    response.headers.set( traceIdHeaderKey, traceId as string );
}