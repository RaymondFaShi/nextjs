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
interface RequestInterceptor<R = RequestConfig> {
    handle: ( config: R ) => R| Promise<R>;
}

type RequestInterceptorConstructor<R = RequestConfig> = {
    new(): RequestInterceptor<R>;
}

interface ResponseInterceptor<R = unknown> {
    handle: ( response: R ) => R| Promise<R>;
}

type ResponseInterceptorConstructor<R = unknown> = {
    new(): ResponseInterceptor<R>;
}

class HttpClient {
    /** 请求配置 */
    private requestConfig: RequestConfig;

    /** 拦截器 */
    private interceptors: {
        request: Map<number, RequestInterceptor<RequestConfig>>;
        response: Map<number, ResponseInterceptor<unknown>>;
    };

    /**
     * construct
     * @param RequestConfig defaultRequestConfig 默认请求参数
     */
    public constructor( requestConfig: RequestConfig ) {
        // 初始化默认参数
        this.requestConfig = requestConfig;
        this.interceptors = {
            request: new Map<number, RequestInterceptor<RequestConfig>>(),
            response: new Map<number, ResponseInterceptor<unknown>>(),
        };
    }

    // 注册请求拦截器
    public useRequestInterceptor( interceptor: RequestInterceptorConstructor ): number {
        // 拦截器id
        const id = this.interceptors.request.size;

        // 拦截器实例
        const interceptorInstance = new interceptor;

        // 注册拦截器
        this.interceptors.request.set( id, interceptorInstance );

        return id;
    }

    // 注册响应拦截器
    public useResponseInterceptor( interceptor: ResponseInterceptorConstructor ): number {
        // 拦截器id
        const id = this.interceptors.response.size;

        // 拦截器实例
        const interceptorInstance = new interceptor;

        // 注册拦截器
        this.interceptors.response.set( id, interceptorInstance );

        return id;
    }

    /**
     * 注销请求拦截器
     * @param requestInterceptorId
     */
    public ejectRequestInterceptor( requestInterceptorId: number ): void {
        this.interceptors.request.delete( requestInterceptorId );
    }

    /**
     * 注销响应拦截器
     * @param responseInterceptorId
     */
    public ejectResponseInterceptor( responseInterceptorId: number ): void {
        this.interceptors.response.delete( responseInterceptorId );
    }

    // 执行请求拦截器
    private async handleRequestInterceptors( config: RequestConfig ): Promise<RequestConfig> {
        for ( const requestInterceptor of this.interceptors.request.values() ) {
            try {
                config = await requestInterceptor.handle( config );
            }
            catch ( error ) {
                throw error;
            }
        }
        return config;
    }

    // 执行响应拦截器
    private async handleResponseInterceptors( response: unknown ): Promise<unknown> {
        for ( const responseInterceptor of this.interceptors.response.values() ) {
            try {
                response = await responseInterceptor.handle( response );
            }
            catch ( error ) {
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
        // const finalConfig = await this.executeRequestInterceptors( mergedRequestConfig );/z

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