// error.d.ts

declare namespace ErrorBoundary {
    /** 基础错误 */
    interface BaseErrorBoundary {
        readonly errorId: string;       // 错误id
        readonly errorCode: string;     // 错误代码
        readonly errorStatus: number| string;    // 错误状态码
        readonly errorMessage: string;           // 错误信息
    }
}