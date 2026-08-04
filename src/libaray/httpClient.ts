/**
 * httpClient http客户端封装（带拦截器）
 * @Version 1.0.0
 * @Email raymond.fa.shi@gmail.com
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */

// interface
/** 请求配置 */
interface RequestConfig {
    baseURL: string;   // 基础URL
    timeout: number;   // 超时时间
    fetchConfig?: RequestInit; // fetch配置
}

// 请求拦截器
interface RequestInterceptor {
    onRequest: ( response: Response ) => Promise<Response>;
    onError?: ( error: unknown ) => void;
}

interface ResponseInterceptor {
    onRequest: ( response: Response ) => Promise<Response>;
    onError?: ( error: unknown ) => void;
}

class HttpClient {
    /** 请求配置 */
    private requestConfig: RequestConfig;

    /** 拦截器 */
    private interceptors: {
        request: RequestInterceptor[];
        response: ResponseInterceptor[];
    };

    /**
     * construct
     * @param RequestConfig defaultRequestConfig 默认请求参数
     */
    public constructor( requestConfig: RequestConfig ) {
        // 初始化默认参数
        this.requestConfig = requestConfig;
        this.interceptors = {
            request: [],
            response: []
        };
    }

    // 注册请求拦截器
    public useRequestInterceptor( interceptor: RequestInterceptor ): number {
        return this.interceptors.request.push( new interceptor );
    }

    // 注册响应拦截器
    public useResponseInterceptor( interceptor: ResponseInterceptor ): number {
        return this.interceptors.response.push( interceptor );
    }

    // 执行请求拦截器
    private async executeRequestInterceptors( config: RequestConfig ): Promise<RequestConfig> {
        for ( const requestInterceptor of this.interceptors.request ) {
            try {
                config = await requestInterceptor.fulfilled( config );
            }
            catch ( error ) {
                if ( requestInterceptor.rejected ) {
                    requestInterceptor.rejected( error );
                }
                throw error;
            }
        }
        return config;
    }

    // 执行响应拦截器
    private async executeResponseInterceptors( response: Response ): Promise<Response> {
        for ( const responseInterceptor of this.interceptors.response ) {
            try {
                response = await responseInterceptor.fulfilled( response );
            }
            catch ( error ) {
                if ( responseInterceptor.rejected ) {
                    responseInterceptor.rejected( error );
                }
                throw error;
            }
        }
        return response;
    }

    /**
     * 发起请求
     * @param uri 资源地址
     * @param requestConfig request参数
     */
    public async request<R = unknown>( uri: string, requestConfig: Partial<RequestConfig> ): Promise<R> {
        // 处理url
        const url = this.requestConfig.baseURL? `${this.requestConfig.baseURL}${uri}`: uri;

        // 合并请求配置
        const mergedRequestConfig: RequestConfig = { ...this.requestConfig, ...requestConfig };

        // 执行请求拦截器
        const finalConfig = await this.executeRequestInterceptors( mergedRequestConfig );

        // 发起请求
        // const response = await fetch( url, finalConfig.fetchConfig );

        // // 执行响应拦截器
        // const finalResponse = await this.executeResponseInterceptors( response );

        // // 解析响应数据
        // const data: R = await finalResponse.json();

        return data;
    }

    /** 请求方法 */
    public async get<T>( uri: string, requestConfig: RequestConfig ): Promise<T> {
        
    }
}

export default HttpClient;
export type {
    RequestConfig,
    RequestInterceptor,
    ResponseInterceptor,
};