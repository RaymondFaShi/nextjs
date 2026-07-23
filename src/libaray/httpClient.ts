/**
 * httpClient http客户端封装（带拦截器）
 * @Version 1.0.0
 * @Email raymond.fa.shi@gmail.com
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */
// interface
interface RequestConfig {
    baseURL?: string;   // 基础URL
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';   // 请求方式
    headers?: Record<string, string>;   // 报头数据
    params?: Record<string, MixedStr>;  // 请求参数
    body?: BodyInit;
    timeout?: number;
}
URLSearchParams
class HttpClient {
    // 默认请求参数
    private defaultRequestConfig: RequestConfig;

    /**
     * construct
     */
    public constructor( defaultRequestConfig: RequestConfig = {} ) {
        this.defaultRequestConfig = defaultRequestConfig;
    }

    /**
     * 发起请求
     */
    private async request() {

    }

    /** 请求方法 */
}

export default HttpClient;