// proxy

// next
import { NextRequest, NextResponse } from "next/server";

export function proxy( request: NextRequest ) {
    // response
    const response = NextResponse.next();

    // requestId
    const headerKey = 'x-request-id';
    // let requestId = request.cookies.get( headerKey )?.value;
    // if( !requestId ) requestId = crypto.randomUUID();
    const requestId = crypto.randomUUID();
    response.cookies.set( headerKey, requestId );   // requestId存储在cookie
log( requestId );
    return response;
}