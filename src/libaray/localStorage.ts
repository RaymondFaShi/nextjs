/**
 * localStorage 封装(client)
 * @Version 1.0.0
 * @Authro raymond.fa.shi
 * @Copyright lemonCarlJ All rights reserved.
 * @License http://www.56code.com/License.txt
 */

class LocalStorage {
    /**
     * 是否客户端
     */
    private static get isClient(): boolean {
        return typeof window !== 'undefined' 
            && typeof window.localStorage !== 'undefined';
    }

    /**
     * 获取数据
     * @param key 键
     */
    public static get( key: string ): string| null {
        // 是否客户端
        if( !this.isClient ) return null;

        try {
            // 拉取数据
            const value = window.localStorage.getItem( key );

            return value;
        }

        catch {
            return null;
        }
    }

    /**
     * 设置数据
     * @param key 键
     * @param value 值
     */
    public static set( key: string, value: string ): boolean {
        // 是否客户端
        if( !this.isClient ) return false;

        try {
            // 设置数据
            window.localStorage.setItem( key, value );

            return true;
        }

        catch {
            return false;
        }
    }

    /**
     * 删除数据
     * @param key 键
     */
    public static remove( key: string ): boolean {
        // 是否客户端
        if( !this.isClient ) return false;

        try {
            // 删除数据
            window.localStorage.removeItem( key )

            return true;
        }

        catch {
            return false;
        }
    }

    /**
     * 清空数据
     */
    public static clear(): boolean {
        // 是否客户端
        if( !this.isClient ) return false;

        try {
            // 删除数据
            window.localStorage.clear();

            return true;
        }
        catch {
            return false;
        }
    }
}

export default LocalStorage;