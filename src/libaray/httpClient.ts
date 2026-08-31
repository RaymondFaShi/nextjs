/**
 * httpClient http客户端封装（带拦截器）
 * @Version 1.0.0
 * @Authro raymond.fa.shi
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */

// interface
/** 请求配置 */
interface RequestConfig {
    baseURL: string;   // 基础URL
    params?: Record<string, unknown>; // url参数
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

    /**
     * 执行请求拦截器
     * @param config 请求配置
     */
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

    /**
     * 执行响应拦截器
     * @param response 响应
     */
    private async handleResponseInterceptors<R = unknown>( response: R ): Promise<R> {
        for ( const responseInterceptor of this.interceptors.response.values() ) {
            try {
                response = await responseInterceptor.handle( response ) as R;
            }
            catch ( error ) {
                throw error;
            }
        }
        return response;
    }

    /**
     * 构建请求url
     * @param baseURL 基础URL
     * @param uri 资源地址
     * @param params url参数
     */
    private buildRequestUrl( baseURL: string, uri: string, params: Record<string, unknown> ): string {
        // 初始化url
        const url = new URL( uri, baseURL );

        // 添加请求参数
        for ( const [ key, value ] of Object.entries( params ) ) {
            url.searchParams.append( key, String( value ) );
        }

        return url.toString();
    }

    /**
     * 发起请求
     * @param uri 资源地址
     * @param requestConfig request参数
     */
    public async request<R = unknown>( uri: string, requestConfig: Partial<RequestConfig> = {} ): Promise<R> {
        try {
            // 合并请求配置
            const mergedRequestConfig: RequestConfig = { ...this.requestConfig, ...requestConfig };

            // 执行请求拦截器
            const finalConfig = await this.handleRequestInterceptors( mergedRequestConfig );

            // 构建请求url
            const requestURL = this.buildRequestUrl( finalConfig.baseURL, uri, finalConfig.params|| {} ); // 请求url

            // 发起请求
            const response = await fetch( requestURL, {
                ...finalConfig.fetchConfig,
                signal: AbortSignal.timeout( finalConfig.timeout?? undefined ), // 超时
            } );

            // 执行响应拦截器
            const finalResponse = await this.handleResponseInterceptors( response ) as R;

            return finalResponse;
        }

        catch ( error ) {
            throw error;
        }
    }

    /** 快捷请求方法 */
    public get<T>( uri: string, requestConfig: RequestConfig ): Promise<T> {  // get
        return this.request( uri, {
            ...requestConfig,
            fetchConfig: {
                method: 'get',
            }
        } );
    }

    public post<T>( uri: string, requestConfig: RequestConfig ): Promise<T> { // post
        return this.request( uri, {
            ...requestConfig,
            fetchConfig: {
                method: 'post',
            }
        } );
    }
}

export default HttpClient;
export type {
    RequestConfig,
    RequestInterceptor,
    ResponseInterceptor,
};