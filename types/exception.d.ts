// exception.d.ts
declare namespace Exception {
    /** 基础异常 */
    interface BaseException {
        readonly traceId: string;           // 异常id
        readonly status: number| string;    // 异常状态码
        readonly message: string;           // 异常信息
    }

    interface BaseExceptionConstructor {
        new( status: BaseException[ 'status' ], message: BaseException[ 'message' ] ): BaseException;
    }

    /** http异常 */
    interface HttpException extends BaseException {
        httpStatus: number; // http状态码
    }
}