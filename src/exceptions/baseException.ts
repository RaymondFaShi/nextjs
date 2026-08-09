/**
 * 基础异常
 */

class BaseException extends Error implements BaseException {

    /** traceId */
    public readonly traceId: string;

    /** code */
    public readonly code: string;

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
        super( message );

        this.traceId = '';
        this.code = '';
        this.status = status;
        this.message = message;
    }
}

export default ( BaseException satisfies Exception.BaseExceptionConstructor<Exception.BaseException> );