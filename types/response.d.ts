// response.d.ts
declare namespace Response {
    /** 基础响应数据 */
    interface BaseResponse {
        code: number| string;   // 系统状态码
        message: string;        // 系统消息
    };

    /**
     * 服务响应数据
     * @param T 返回数据格式
     * @param U 合并数据格式
     */
    interface ServerResponse<T = unknown, U = unknown> extends BaseResponse {
        result: {
            status: number| string; // 业务状态码
            message: string;        // 业务消息
            data?: T;               // 业务数据
        } & U;
    };

    /** 分页 */
    type Pagination = {
        limit: number;      // 页面尺寸
        current: number;    // 当前页
        total: number;      // 总页数
    };

    /**
     * 选项
     * @param K key
     * @param V value
     */
    type OptionItem<K = number| string, V = number| string> = { label: K, value: V };
}