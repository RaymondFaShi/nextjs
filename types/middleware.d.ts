// middleware.d.ts

declare namespace Middleware {
    interface Proxy {
        ( request: NextRequest, response?: NextResponse ): void| MiddlewareResponseInit| NextResponse| Promise<NextResponse>
    }
}