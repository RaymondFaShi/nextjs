// exception.d.ts
declare namespace Exception {
    /** 基础异常 */
    interface BaseException {
        // 链式追踪
        readonly sessionId?: string;  // session id
        readonly clientId?: sting;    // clientId

        readonly code: string;              // 错误代码
        readonly status: number| string;    // 异常状态码
        readonly message: string;           // 异常信息
    }

    /** http异常 */
    interface HttpException extends BaseException {
        // 链式追踪
        readonly requestId?: string;    // request id

        readonly httpStatus: number; // http状态码
    }
}