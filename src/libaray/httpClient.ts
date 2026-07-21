/**
 * httpClient http客户端封装（带拦截器）
 * @Version 1.0.0
 * @Email raymond.fa.shi@gmail.com
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */

// ============ 类型定义 ============

/** JSON 对象类型 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonObject = Record<string, any>;

/** 请求体支持的类型 */
type RequestBody = BodyInit | JsonObject | null;

/** 请求配置，继承标准 RequestInit */
export interface RequestConfig extends Omit<RequestInit, 'body'> {
  /** 基础 URL，会与传入的 url 拼接 */
  baseURL?: string;
  /** URL 查询参数 */
  params?: Record<string, string | number | boolean | undefined | null>;
  /** 请求超时时间（毫秒） */
  timeout?: number;
  /** 响应数据类型 */
  responseType?: 'json' | 'text' | 'blob' | 'arrayBuffer';
  /** 请求体（支持对象，会自动 JSON.stringify） */
  body?: RequestBody;
}

/** 内部使用的完整请求配置（保证 url 字段存在） */
export type InternalRequestConfig = RequestConfig & { url: string };

/** 请求拦截器 - 成功 */
export type RequestInterceptorFulfilled = (
  config: InternalRequestConfig
) => InternalRequestConfig | Promise<InternalRequestConfig>;

/** 请求拦截器 - 失败 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestInterceptorRejected = ( error: any ) => any;

/** 响应拦截器 - 成功 */
export type ResponseInterceptorFulfilled = (
  response: unknown
) => unknown | Promise<unknown>;

/** 响应拦截器 - 失败 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseInterceptorRejected = ( error: any ) => any;

/** 拦截器条目 */
interface InterceptorEntry<T, R> {
  onFulfilled: T;
  onRejected?: R;
}

// ============ 工具函数 ============

/** 判断值是否为需要 JSON 序列化的普通对象 */
function isPlainObject( value: unknown ): value is JsonObject {
    if ( value === null || typeof value !== 'object' ) return false;
    if ( value instanceof FormData ) return false;
    if ( value instanceof Blob ) return false;
    if ( value instanceof ArrayBuffer ) return false;
    if ( value instanceof URLSearchParams ) return false;
    if ( value instanceof ReadableStream ) return false;
    return true;
}

/** 将请求体序列化为 BodyInit */
function serializeBody( body: RequestBody ): BodyInit | null | undefined {
    if ( body == null ) {
        return null;
    }
    if ( isPlainObject( body ) ) {
        return JSON.stringify( body );
    }
    return body;
}

// ============ HttpClient 类 ============

class HttpClient {
    private baseURL: string;
    private defaultConfig: RequestConfig;
    private requestInterceptors: InterceptorEntry<
    RequestInterceptorFulfilled,
    RequestInterceptorRejected
  >[] = [];
    private responseInterceptors: InterceptorEntry<
    ResponseInterceptorFulfilled,
    ResponseInterceptorRejected
  >[] = [];

    constructor( baseURL = '', defaultConfig: RequestConfig = {} ) {
        this.baseURL = baseURL;
        this.defaultConfig = defaultConfig;
    }

    // ========== 拦截器注册 ==========

    /**
   * 注册请求拦截器
   * @param onFulfilled 请求发送前调用，可修改请求配置
   * @param onRejected 请求配置出错时调用
   * @returns 用于移除拦截器的 ID
   *
   * @example
   * // 添加认证 token
   * http.useRequestInterceptor((config) => {
   *   config.headers = {
   *     ...config.headers,
   *     Authorization: `Bearer ${getToken()}`,
   *   };
   *   return config;
   * });
   *
   * @example
   * // 请求日志
   * http.useRequestInterceptor((config) => {
   *   console.log(`[Request] ${config.method || 'GET'} ${config.url}`);
   *   return config;
   * });
   */
    useRequestInterceptor(
        onFulfilled: RequestInterceptorFulfilled,
        onRejected?: RequestInterceptorRejected
    ): number {
        this.requestInterceptors.push( { onFulfilled, onRejected } );
        return this.requestInterceptors.length - 1;
    }

    /**
   * 注册响应拦截器
   * @param onFulfilled 响应成功后调用，可修改响应数据
   * @param onRejected 响应失败时调用
   * @returns 用于移除拦截器的 ID
   *
   * @example
   * // 统一处理业务错误码
   * http.useResponseInterceptor(
   *   (data) => {
   *     if (data.code !== 0) {
   *       throw new Error(data.message || '请求失败');
   *     }
   *     return data;
   *   },
   *   (error) => {
   *     console.error('[Response Error]', error);
   *     throw error;
   *   }
   * );
   */
    useResponseInterceptor(
        onFulfilled: ResponseInterceptorFulfilled,
        onRejected?: ResponseInterceptorRejected
    ): number {
        this.responseInterceptors.push( { onFulfilled, onRejected } );
        return this.responseInterceptors.length - 1;
    }

    /**
   * 移除请求拦截器
   * @param id useRequestInterceptor 返回的 ID
   */
    ejectRequestInterceptor( id: number ): void {
        if ( id >= 0 && id < this.requestInterceptors.length ) {
            delete this.requestInterceptors[ id ];
        }
    }

    /**
   * 移除响应拦截器
   * @param id useResponseInterceptor 返回的 ID
   */
    ejectResponseInterceptor( id: number ): void {
        if ( id >= 0 && id < this.responseInterceptors.length ) {
            delete this.responseInterceptors[ id ];
        }
    }

    // ========== 核心请求方法 ==========

    /**
   * 发起 HTTP 请求
   *
   * 执行流程：
   * 1. 合并默认配置和请求配置
   * 2. 依次执行请求拦截器（注册顺序）
   * 3. 通过 fetch 发起请求（支持超时）
   * 4. 依次执行响应拦截器（注册顺序）
   * 5. 返回最终结果
   */
    async request<T = unknown>(
        url: string,
        config: RequestConfig = {}
    ): Promise<T> {
    // 1. 合并配置
        let finalConfig: InternalRequestConfig = {
            ...this.defaultConfig,
            ...config,
            url,
            headers: {
                'Content-Type': 'application/json',
                ...this.defaultConfig.headers as Record<string, string>,
                ...config.headers as Record<string, string>,
            },
        };

        // 处理 baseURL
        const baseURL = finalConfig.baseURL ?? this.baseURL;
        let fullUrl: string;
        if ( baseURL ) {
            fullUrl = `${baseURL.replace( /\/$/, '' )}/${url.replace( /^\//, '' )}`;
        } else {
            fullUrl = url;
        }

        // 处理 query params
        if ( finalConfig.params ) {
            const searchParams = new URLSearchParams();
            Object.entries( finalConfig.params )
                .forEach( ( [ key, value ] ) => {
                    if ( value !== undefined && value !== null ) {
                        searchParams.append( key, String( value ) );
                    }
                } );
            const queryString = searchParams.toString();
            if ( queryString ) {
                fullUrl += ( fullUrl.includes( '?' ) ? '&' : '?' ) + queryString;
            }
        }

        finalConfig.url = fullUrl;

        // 保存用户配置（用于请求拦截器中可读取原始值）
        const responseType =
      config.responseType ?? this.defaultConfig.responseType ?? 'json';
        const timeout = config.timeout ?? this.defaultConfig.timeout ?? 0;

        try {
            // 2. 执行请求拦截器链（请求拦截器可以看到完整的 InternalRequestConfig）
            for ( const interceptor of this.requestInterceptors ) {
                if ( !interceptor ) continue;
                try {
                    finalConfig = await interceptor.onFulfilled( { ...finalConfig } );
                } catch ( error ) {
                    if ( interceptor.onRejected ) {
                        interceptor.onRejected( error );
                    }
                    throw error;
                }
            }

            // 请求拦截器执行完毕后，提取 fetch 需要的字段并序列化 body
            /* eslint-disable @typescript-eslint/no-unused-vars */
            const {
                baseURL: _b,
                params: _p,
                timeout: _t,
                responseType: _rt,
                body,
                ...restConfig
            } = finalConfig;
            /* eslint-enable @typescript-eslint/no-unused-vars */

            // 构建标准的 RequestInit（body 类型正确）
            const requestInit: RequestInit = {
                ...restConfig,
                body: serializeBody( body as RequestBody ),
            };

            // 3. 发起请求（带超时）
            const controller = new AbortController();
            let timeoutId: ReturnType<typeof setTimeout> | null = null;

            if ( timeout > 0 ) {
                timeoutId = setTimeout( () => controller.abort(), timeout );
            }

            // 如果外部传了自己的 signal，需要合并
            if ( requestInit.signal ) {
                requestInit.signal.addEventListener(
                    'abort',
                    () => controller.abort()
                );
            }

            let response: Response;
            try {
                response = await fetch( finalConfig.url, {
                    ...requestInit,
                    signal: controller.signal,
                } );
            } finally {
                if ( timeoutId ) clearTimeout( timeoutId );
            }

            // 4. 处理 HTTP 错误
            if ( !response.ok ) {
                const errorBody = await response.text()
                    .catch( () => '' );
                throw new HttpError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    errorBody
                );
            }

            // 5. 解析响应体
            let data: unknown;
            switch ( responseType ) {
                case 'text':
                    data = await response.text();
                    break;
                case 'blob':
                    data = await response.blob();
                    break;
                case 'arrayBuffer':
                    data = await response.arrayBuffer();
                    break;
                case 'json':
                default:
                    data = await response.json();
                    break;
            }

            // 6. 执行响应拦截器链
            let result: unknown = data;
            for ( const interceptor of this.responseInterceptors ) {
                if ( !interceptor ) continue;
                try {
                    result = await interceptor.onFulfilled( result );
                } catch ( error ) {
                    if ( interceptor.onRejected ) {
                        result = interceptor.onRejected( error );
                    } else {
                        throw error;
                    }
                }
            }

            return result as T;
        } catch ( error ) {
            throw error;
        }
    }

    // ========== 便捷方法 ==========

    /** GET 请求 */
    get<T = unknown>( url: string, config?: RequestConfig ): Promise<T> {
        return this.request<T>( url, { ...config, method: 'GET' } );
    }

    /** POST 请求 */
    post<T = unknown>(
        url: string,
        data?: RequestBody,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>( url, {
            ...config,
            method: 'POST',
            body: data,
        } );
    }

    /** PUT 请求 */
    put<T = unknown>(
        url: string,
        data?: RequestBody,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>( url, {
            ...config,
            method: 'PUT',
            body: data,
        } );
    }

    /** PATCH 请求 */
    patch<T = unknown>(
        url: string,
        data?: RequestBody,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>( url, {
            ...config,
            method: 'PATCH',
            body: data,
        } );
    }

    /** DELETE 请求 */
    delete<T = unknown>( url: string, config?: RequestConfig ): Promise<T> {
        return this.request<T>( url, { ...config, method: 'DELETE' } );
    }

    /** HEAD 请求 */
    head<T = unknown>( url: string, config?: RequestConfig ): Promise<T> {
        return this.request<T>( url, { ...config, method: 'HEAD' } );
    }

    /** OPTIONS 请求 */
    options<T = unknown>( url: string, config?: RequestConfig ): Promise<T> {
        return this.request<T>( url, { ...config, method: 'OPTIONS' } );
    }
}

// ============ 自定义错误类 ============

export class HttpError extends Error {
    /** HTTP 状态码 */
    status: number;
    /** 响应体文本 */
    body: string;

    constructor( message: string, status: number, body: string ) {
        super( message );
        this.name = 'HttpError';
        this.status = status;
        this.body = body;
    }
}

// ============ 默认导出 ============

export default HttpClient;
