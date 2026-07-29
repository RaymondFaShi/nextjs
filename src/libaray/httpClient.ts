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
    timeout?: number;
}

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
    public async request( url: string, fetchConfig: RequestInit ) {
        
    }

    /** 请求方法 */
}

export default HttpClient;