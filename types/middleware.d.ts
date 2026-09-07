// middleware.d.ts
declare namespace Middleware {
    /** nextjs proxy 返回数据 */
    type ProxyResult = Record<string, unknown> & {
        // ctx?: MiddlewareResponseInit;   // reponse配置
    }

    /** nextjs proxy 返回数据 */
    interface Proxy<ProxyResult> {
        ( request: NextRequest, response?: NextResponse ): ProxyResult| Promise<ProxyResult>;
    }
}