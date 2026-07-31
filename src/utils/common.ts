// 公共方法

/**
 * 对象copy
 * @param jsonStr 复制json字符
 */
export function copy<T extends Record<string, unknown>>( jsonStr: T ): T {
    return JSON.parse( JSON.stringify( jsonStr ) );
}

/**
 * object合并
 * @param target 目标object
 * @param source 源object
 * @param append 是否追加
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
 * @param {array} arr1
 * @param {array} arr2
 */
export function arrayMerge( arr1: unknown[], arr2: unknown[] ) {
    let _arr = new Array();
    for ( let i = 0; i < arr1.length; i++ ) {
        _arr.push( arr1[ i ] );
    }
    for ( let i = 0; i < arr2.length; i++ ) {
        let flag = true;
        for ( let j = 0; j < arr1.length; j++ ) {
            if ( arr2[ i ] == arr1[ j ] ) {
                flag = false;
                break;
            }
        }
        if ( flag ) {
            _arr.push( arr2[ i ] );
        }
    }
    return _arr;
}

/**
 * 安全随机数
 * @param min 最小数
 * @param max 最大数
 */
export function secureRandNum( min: number, max: number ): number| boolean {
    // 判断传参是否正确
    if( !Number.isInteger( min ) || !Number.isInteger( max ) ) return false;
    if( min > max ) return false;

    // 初始化参数
    const range = max - min + 1;
    const maxUint32 = 0xffffffff;

    // 防止取模偏差（rejection sampling）
    const limit = maxUint32 - ( maxUint32 % range );
    const random = new Uint32Array( 1 );

    // 取值
    let value: number;
    do {
        crypto.getRandomValues( random );
        value = random[ 0 ];
    } while ( value >= limit );

    // 返回
    return ( value % range ) + min;
}

/**
 * 安全随机生成字符串
 * @param number length 生成字符串长度
 * @param enum $type 生成类型 [ 0-默认 1-数字 2-数字+小写字母+大写字母 ]
 * @param bool $repeat 是否重复[ false ]
 * @see 数字超过10, 不能要求去重
 */
export function secureRandStr( length: number, type: 0| 1| 2 = 0, repeat: boolean = false ): string| false {
    const lowStr: string = 'abcdefghijklmnopqrstuvwxyz';     // 小写字母
    const powerStr: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';   // 大写字母
    const numberStr: string = '0123456789';                  // 数字

    // 种子
    let seedString: string = '';
    switch ( type ) {
        case 1: seedString = numberStr; break;
        case 2: seedString = numberStr + lowStr + powerStr;break;
        default: seedString = numberStr + lowStr; break;
    }
    const seedStrArr = seedString.split( '' );

    // 生成字符串
    const generateStr: string[] = [];
    while ( generateStr.length < length ) {
        // 获取随机字符串
        const randIndex = secureRandNum( 0, seedStrArr.length - 1 );
        const randStr = seedStrArr[ ( randIndex as number ) ];

        // 判断是否重复
        if( !repeat ) {
            if( generateStr.includes( randStr ) ) continue;
        }

        generateStr.push( randStr );;
    }

    return generateStr.join( '' );
}

/**
 * 安全比较
 * @param aStr a字符
 * @param bStr b字符
 */
export function secureCompare( aStr: string, bStr: string ): boolean {
    // 保证长度一致
    if ( aStr.length !== bStr.length ) return false;

    // 返回
    let result = 0;

    // 每个字符异或累加，保证循环不会提前返回
    for ( let i = 0; i < aStr.length; i++ ) {
        result |= aStr.charCodeAt( i ) ^ bStr.charCodeAt( i );
    }

    return result === 0;
}