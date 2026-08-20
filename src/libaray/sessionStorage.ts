/**
 * sessionStorage 封装(client)
 * @Version 1.0.0
 * @Email raymond.fa.shi@gmail.com
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */

// interface

class SessionStorage {
    /**
     * 获取
     * @param sessionName session名
     */
    public static get( sessionName: string ): string| null {
        // 没有找到document
        if( typeof window === 'undefined' ) return null;

        try {
            // 拉取数据
            const value = window.sessionStorage.getItem( sessionName );

            return value;
        }
        catch {
            return null;
        }
    }

    /**
     * 设置
     * @param sessionName session名
     * @param sessionValue session值
     */
    public static set( sessionName: string, sessionValue: string ): boolean {
        // 没有找到document
        if( typeof window === 'undefined' ) return false;

        try {
            // 设置数据
            window.sessionStorage.setItem( sessionName, sessionValue );

            return true;
        }

        catch {
            return false;
        }
    }

    /**
     * 删除
     * @param sessionName session名
     */
    public static remove( sessionName: string ): boolean {
        // 没有找到document
        if( typeof window === 'undefined' ) return false;

        try {
            // 删除数据
            window.sessionStorage.removeItem( sessionName );

            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * 清空
     */
    public static clear(): boolean {
        // 没有找到document
        if( typeof window === 'undefined' ) return false;

        try {
            // 删除数据
            window.sessionStorage.clear();

            return true;
        }
        catch {
            return false;
        }
    }
}

export default SessionStorage;