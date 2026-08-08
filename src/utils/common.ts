// 公共方法

/**
 * 对象copy
 * @param jsonStr 复制json字符
 * @returns 复制后的对象
 */
export function copy<T extends Record<string, unknown>>( jsonStr: T ): T {
    return JSON.parse( JSON.stringify( jsonStr ) );
}

/**
 * object合并
 * @param target 目标object
 * @param source 源object
 * @param append 是否追加
 * @returns 合并后的object
 */
export function objectMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>( target: T, source: U, append: boolean = true ): T {
    // 目标非object
    if( target === null || typeof target !== 'object' ) {
        target = {} as T;
    }

    // 如果源是array
    if( Array.isArray( source ) ) {
        source.forEach( ( sourceItem, property ) => {
            return objectMerge( target[ property ] as T, sourceItem as T, append );
        } );
    }

    // 遍历源数据复制到目标数据
    Object.keys( source )
        .forEach( ( property: keyof U ) => {
            // 源数据
            const sourceData = ( typeof source[ property ] === "undefined" || source[ property ] === null )? "": source[ property ];

            // 如果追加或者目标有对应的键值
            if ( append || typeof target[ property as keyof T ] !== "undefined" ) {
                if ( typeof sourceData === "object" && sourceData!== null ) {
                    target[ property as keyof T ] = objectMerge( target[ property as keyof T ] as T, sourceData as T, append ) as T[ keyof T ];
                }

                else {
                    target = Object.assign( {}, target, { [ property ]: sourceData } );
                }
            }

            // 超出数据
            if ( typeof sourceData === "object" && JSON.stringify( target ) !== "{}" && typeof target[ property as keyof T ] === "undefined" ) {
                // 追加目标数据
                const appendTargetData = objectMerge( JSON.parse( JSON.stringify( target[ Object.keys( target )[ 0 ] ] ) ), sourceData as U, append );
                target = Object.assign( {}, target, { [ property ]: appendTargetData } );
            }
        } );
    return target;
}

/**
 * 数组合并
 * @param arrays 数组列表
 */
export function arrayMerge( ...arrays: unknown[][] ): unknown[] {
    let result: unknown[] = [];
    arrays.forEach( arr => {
        result = [ ...result, ...arr ];
    } );
    return result;
}

/**
 * 版本比对
 * @param localVersion 本地版本
 * @param remoteVersion 远程版本
 * @returns 是否需要更新 0-未知 1-不需要更新 2-版本不一致 3-需要更新
 * @description 更新策略，第三个版本是不一样的不需要强制更新，第二个版本不一样需要强制更新，第一个版本不一样需要强制更新
 */
export function compareVersion( localVersion: string, remoteVersion: string ): number {
    // 将版本号分割成数组
    const localParts = localVersion.split( '.' ).map( Number );
    const remoteParts = remoteVersion.split( '.' ).map( Number );

    // 版本号必须包含三个部分
    if ( localParts.length !== 3 || remoteParts.length !== 3 ) {
        return 0;   // 版本格式不正确，无法比较
    }

    // 比对第三个版本号
    if ( localParts[ 2 ] !== remoteParts[ 2 ] ) {
        return 2;   // 不需要强制更新
    }

    // 比对第二个版本号
    if ( localParts[ 1 ] !== remoteParts[ 1 ] ) {
        return 3;   // 需要更新
    }

    // 比对第一个版本号
    if ( localParts[ 0 ] !== remoteParts[ 0 ] ) {
        return 3;   // 需要更新
    }

    return 1;  // 版本一致
}

/**
 * 睡眠时间
 * @param ms 毫秒
 * @returns 异步执行n毫秒
 */
export const sleep = ( ms: number ) => new Promise( resolve => setTimeout( resolve, ms ) );

/**
 * 防抖(建议直接用lodash-es)
 * @param func 函数
 * @param wait 等待时间(毫秒)
 * @param immediate 是否立即执行
 */
export function debounce<T extends ( ...args: unknown[] ) => unknown >(
    func: T,
    wait: number,
    immediate: boolean = false,
): ( this: ThisParameterType<T>, ...args: Parameters<T> ) => ReturnType<T> {
    let timeout: ReturnType<typeof setTimeout> | null,
        args: Parameters<T>| null,
        context: ThisParameterType<T> | null,
        timestamp: number = 0,
        result: ReturnType<T>;

    const later = function() {
    // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if ( last < wait && last > 0 ) {
            timeout = setTimeout( later, wait - last )
        }

        else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if ( !immediate ) {
                result = func.apply( context, args as Parameters<T> ) as ReturnType<T>;
                if ( !timeout ) {
                    context = null;
                    args = null;
                }
            }
        }
    }

    return function( this: ThisParameterType<T>, ...args: Parameters<T> ): ReturnType<T> {
        let lastContext = this as ThisParameterType<T>| null;
        let lastArgs: Parameters<T>| null = args;
        timestamp = +new Date();

        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if ( !timeout ) timeout = setTimeout( later, wait )
        if ( callNow ) {
            result = func.apply( lastContext, lastArgs ) as ReturnType<T>;
            lastContext = null;
            lastArgs = null;
        }

        return result
    }
}

/**
 * 节流(建议直接用lodash-es)
 * @param func 函数
 * @param wait 等待时间(毫秒)
 * @param options 选项 { leading: 第一次触发, trailing: 最后一次触发 }
 * @returns 
 */
export function throttle<T extends ( ...args: any[] ) => any>(
    func: T,
    wait: number,
    options: { leading?: boolean, trailing?: boolean } = {}
): (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T> | undefined {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let timestamp: number = 0;
    let lastArgs: Parameters<T> | null = null;
    let lastContext: ThisParameterType<T> | null = null;
    let result: ReturnType<T>;
    const { leading = true, trailing = true } = options;

    const invoke = () => {
        if( lastArgs !== null ) {
            result = func.apply( lastContext, lastArgs );
            lastArgs = null;
            lastContext = null;
        }
    };

    const later = () => {
        timestamp = leading? Date.now(): 0;
        timeout = null;
        if ( trailing ) {
            invoke();
        }

        else {
            lastArgs = null;
            lastContext = null;
        }
    };

    return function( this: ThisParameterType<T>, ...args: Parameters<T> ) {
        lastContext = this as ThisParameterType<T>| null;
        lastArgs = args;
        const now = Date.now();
        if ( !timestamp && !leading ) {
            timestamp = now;
        }
        const remaining = wait - ( now - timestamp );

        if ( remaining <= 0 || remaining > wait ) {
            if ( timeout ) {
                clearTimeout( timeout );
                timeout = null;
            }
            timestamp = now;
            invoke();
        }

        else if ( !timeout && trailing ) {
            timeout = setTimeout(
                later,
                remaining
            );
        }
        return result;
    };
}