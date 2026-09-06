// middleware.d.ts
declare namespace Middleware {
    /** nextjs proxy */
    type ProxyResult = Record<string, unknown> & {
        ctx?: MiddlewareResponseInit;   // reponse配置
    }

    interface Proxy<ProxyResult> {
        ( request: NextRequest, response?: NextResponse ): ProxyResult| Promise<ProxyResult>;
    }
}