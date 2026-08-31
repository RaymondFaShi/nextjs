// middleware.d.ts

declare namespace Middleware {
    /** nextjs proxy */
    interface Proxy {
        ( request: NextRequest, response?: NextResponse ): void| MiddlewareResponseInit| NextResponse| Promise<NextResponse>
    }
}