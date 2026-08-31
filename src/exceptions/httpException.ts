/**
 * http异常
 */

// exception
import BaseException from "./baseException";

/**
 * http异常类
 */
class HttpException extends BaseException {
    /** code */
    public readonly code: string = 'NETWORK';

    /** status */
    public status: number| string;

    /** message */
    public message: string;

    /** request id */
    public readonly requestId?: string;

    /** request id */
    public readonly method?: string;

    /** request id */
    public readonly path?: string;

    /**
     * construct
     * @param status 异常状态码
     * @param message 异常信息
     * @param ctx 上下文
    */
    public constructor( status: number| string, message: string, ctx?: Exception.HttpContext ) {
        // parent
        super( status, message );

        // 状态，消息
        this.status = status;
        this.message = message;

        // http属性
        this.requestId = ctx?.requestId;
        this.method = ctx?.method;
        this.path = ctx?.path;
    }
}

export default HttpException;