// exception
import BaseException from "./baseException";

/**
 * http异常
 */
class HttpException extends BaseException {
    /** code */
    public readonly code: string = 'network';

    /** status */
    public status: number| string;

    /** message */
    public message: string;

    /**
     * construct
     * @param status 异常状态码
     * @param message 异常信息
    */
    public constructor( status: number| string, message: string ) {
        // parent
        super( status, message );

        // 状态，消息
        this.status = status;
        this.message = message;
    }
}

export default ( HttpException satisfies Exception.BaseExceptionConstructor<Exception.HttpException> );