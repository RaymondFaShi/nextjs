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
    timeout?: number;   // 超时时间
}

class HttpClient {
    // 请求配置
    private requestConfig: RequestConfig;

    /**
     * construct
     * @param RequestConfig defaultRequestConfig 默认请求参数
     */
    public constructor( requestConfig: RequestConfig = {} ) {
        // 定义默认参数
        

        this.requestConfig = requestConfig;
    }

    /**
     * 发起请求
     * @param {string} uri 资源地址
     * @param {RequestInit} fetchConfig fetch参数
     */
    public async request<R = unknown>( uri: string, fetchConfig: RequestInit ): Promise<R> {
        
    }

    /** 请求方法 */
    public async get<T>( uri: string, fetchConfig: RequestInit ): Promise<T> {
        
    }
}

export default HttpClient;