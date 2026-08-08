/**
 * 基础异常
 */

abstract class BaseException implements Exception.BaseException {
    /** traceId */
    public readonly traceId: string;

    /** code */
    public static readonly code: string = '';

    /** status */
    public readonly status: number| string;

    /** message */
    public readonly message: string;

    /**
     * construct
     * @param status 异常状态码
     * @param message 异常信息
    */
    public constructor( status: number| string, message: string ) {
        this.traceId = '';
        // this.code = '';
        this.status = status;
        this.message = message;
    }
}

export default BaseException;