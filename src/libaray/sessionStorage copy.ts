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
     * 获取 sessionStorage
     */
    private static getStorage(): Storage| undefined {
        if ( typeof window === 'undefined' ) {
            return undefined;
        }

        return window.sessionStorage;
    }

    /**
     * 获取数据
     *
     * @param key 键
     * @returns 数据，不存在时返回 undefined
     */
    public static get<T>( key: string ): T | undefined {
        const storage = this.getStorage();

        if ( !storage ) {
            return undefined;
        }

        try {
            const value = storage.getItem( key );

            if ( value === null ) {
                return undefined;
            }

            return JSON.parse( value ) as T;
        } catch {
            return undefined;
        }
    }

    /**
     * 设置数据
     *
     * @param key 键
     * @param value 值
     */
    public static set<T>( key: string, value: T ): boolean {
        const storage = this.getStorage();

        if ( !storage ) {
            return false;
        }

        try {
            storage.setItem( key, JSON.stringify( value ) );

            return true;
        } catch {
            return false;
        }
    }

    /**
     * 删除数据
     */
    public static remove( key: string ): boolean {
        const storage = this.getStorage();

        if ( !storage ) {
            return false;
        }

        try {
            storage.removeItem( key );

            return true;
        } catch {
            return false;
        }
    }

    /**
     * 清空当前 SessionStorage
     */
    public static clear(): boolean {
        const storage = this.getStorage();

        if ( !storage ) {
            return false;
        }

        try {
            storage.clear();

            return true;
        } catch {
            return false;
        }
    }
}

export default SessionStorage;
export type {
    
};