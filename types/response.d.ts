// response.d.ts
declare namespace Response {
    /** 基础响应数据 */
    interface BaseResponse {
        code: number| string;
        message: string;
    };

    /** 服务响应数据 */
    interface ServerResponse<T = unknown, K = unknown> extends BaseResponse {
        result: {
            status: number| string;
            message: string;
            data?: T;
        } & K
    };

    /** 分页 */
    type Pagination = {
        limit: number;      // 页面尺寸
        current: number;    // 当前页
        total: number;      // 总页数
    };

    /** 选项 */
    type OptionItem<Label = number| string, Value = number| string> = { label: Label, value: Value };
}