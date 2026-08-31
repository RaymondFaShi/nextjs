/**
 * 基础异常
 */

/**
 * 基础异常抽象类
 */
abstract class BaseException extends Error implements Exception.BaseException {
    /** session id */
    public sessionId?: string;

    /** client id */
    public clientId?: string;

    /** code */
    public readonly code: string = '';

    /** status */
    public readonly status: number| string;

    /** message */
    public readonly message: string;

    /**
     * construct
     * @param status 异常状态码
     * @param message 异常信息
     * @param ctx 上下文
    */
    public constructor( status: number| string, message: string, ctx?: Exception.Context ) {
        // parent
        super( message );

        // 状态，消息
        this.status = status;
        this.message = message;

        // 追踪链
        this.sessionId = ctx?.sessionId;
        this.clientId = ctx?.clientId;
        this.cause = ctx?.cause;
    }
}

export default BaseException;