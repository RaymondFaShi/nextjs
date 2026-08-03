/**
 * httpClient http客户端封装（带拦截器）
 * @Version 1.0.0
 * @Email raymond.fa.shi@gmail.com
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */

// interface
/** 请求配置 */
interface RequestConfig {   // 请求配置
    baseURL: string;   // 基础URL
    timeout: number;   // 超时时间
    fetchConfig?: RequestInit; // fetch配置
}

/** 请求拦截器 */
interface RequestInterceptor {
    fulfilled: RequestInterceptorFulfilled;
    rejected?: RequestInterceptorRejected;
}

/** 响应拦截器 */
interface ResponseInterceptor {
    fulfilled: ResponseInterceptorFulfilled;
    rejected?: ResponseInterceptorRejected;
}

/** 请求拦截器 - 成功 */
interface RequestInterceptorFulfilled {
    ( config: RequestConfig ): RequestConfig | Promise<RequestConfig>;
}

/** 请求拦截器 - 失败 */
interface RequestInterceptorRejected {
    ( error: unknown ): unknown;
}

/** 响应拦截器 - 成功 */
interface ResponseInterceptorFulfilled {
    ( response: Response ): Response | Promise<Response>;
}

/** 响应拦截器 - 失败 */
interface ResponseInterceptorRejected{
    ( error: unknown ): unknown;
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
    public addRequestInterceptor( interceptor: RequestInterceptor ): number {
        return this.interceptors.request.push( interceptor );
    }

    // 注册响应拦截器
    public addResponseInterceptor( interceptor: ResponseInterceptor ): number {
        return this.interceptors.response.push( interceptor );
    }

    // 注销请求拦截器
    public removeRequestInterceptor( requestInterceptorId: number ): void {
        this.interceptors.request.splice( requestInterceptorId, 1 );
    }

    // 注销响应拦截器
    public removeResponseInterceptor( responseInterceptorId: number ): void {
        this.interceptors.response.splice( responseInterceptorId, 1 );
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
    RequestInterceptor, RequestInterceptorFulfilled, RequestInterceptorRejected,
    ResponseInterceptor, ResponseInterceptorFulfilled, ResponseInterceptorRejected,
};