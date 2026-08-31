/**
 * cookies 封装(client)
 * @Version 1.0.0
 * @Authro raymond.fa.shi
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */

// interface
/** cookie选项 */
interface CookieOptions {
    maxAge?: number;    // Cookie 最大存活时间，单位：秒
    expires?: Date;     // Cookie 过期时间
    path?: string;      // Cookie 路径
    domain?: string;    // Cookie Domain
    secure?: boolean;   // 是否仅 HTTPS
    sameSite?: "strict"| "lax"| "none"; // 跨域策略
    priority?: "low"| "medium"| "high";   // 优先级（谷歌独占）
}

/** cookie类型 */
type CookieType = Record<string, string>;

class Cookies {

    /**
     * 是否客户端
     */
    private static get isClient(): boolean {
        return typeof document !== 'undefined' 
            && typeof document.cookie !== 'undefined';
    }

    /**
     * 获取全部cookies
     */
    public static getAll(): undefined | CookieType {
        // 是否客户端
        if( !this.isClient ) return undefined;

        // 初始化返回数据
        const cookiesResult: CookieType = {};

        // 如果cookie是空
        if( document.cookie ) {
            for( const cookie of document.cookie.split( '; ' ) ) {
                const splitIndex = cookie.indexOf( '=' );   // 分割位置
                if( splitIndex === -1 ) continue;   // 没有找到分割位置
                const cookieName = decodeURIComponent( cookie.slice( 0, splitIndex ) );
                const cookieValue = decodeURIComponent( cookie.slice( splitIndex + 1 ) );

                cookiesResult[ cookieName ] = cookieValue;
            }
        }

        return cookiesResult;
    }

    /**
     * 获取cookie
     * @param coookieName cookie名
     */
    public static get( coookieName: string ): undefined | string {
        // 是否客户端
        if( !this.isClient ) return undefined;

        if( document.cookie ) {
            // 全部cookie
            const cookies = document.cookie.split( '; ' );

            // 查找cookie
            const cookie = cookies.find( item => item.startsWith( `${encodeURIComponent( coookieName )}=` ) );

            // 查到返回数据
            if ( cookie !== undefined ) {
                const splitIndex = cookie.indexOf( '=' );   // // 分割位置
                return decodeURIComponent( cookie.slice( splitIndex + 1 ) );
            }
        }

        return undefined;
    }

    /**
     * 设置cookie
     * @param cookieName cookie名
     * @param cookieValue cookie值
     * @param options cookie选项
     */
    public static set( cookieName: string, cookieValue: string, options?: CookieOptions ): void {
        // 是否客户端
        if( !this.isClient ) return ;

        // 设置cookie内容
        let cookie = `${encodeURIComponent( cookieName )}=${encodeURIComponent( cookieValue )}`;

        // 追加选项
        if( options ) {
            if( options.maxAge !== undefined ) cookie += `; Max-Age=${options.maxAge}`;
            if( options.expires !== undefined ) cookie += `; Expires=${options.expires}`;
            if( options.path !== undefined ) cookie += `; Path=${options.path}`;
            if( options.domain !== undefined ) cookie += `; Domain=${options.domain}`;
            if( options.secure !== undefined ) cookie += `; Secure=${options.secure}`;
            if( options.sameSite !== undefined ) cookie += `; SameSite=${options.sameSite}`;
            if( options.priority !== undefined ) cookie += `; Priority=${options.priority}`;
        }

        document.cookie = cookie;
    }

    /**
     * 删除cookie
     * @param coookieName cookie名
     * @param options cookie选项
     */
    public static remove( cookieName: string, options?: Omit<CookieOptions, 'maxAge'| 'expires'> ): void {
        this.set( cookieName, '', {
            ...options,
            maxAge: 0,
        } );
    }
}

export default Cookies;
export type {
    CookieType,
    CookieOptions,
};