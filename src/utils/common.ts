// 公共方法

/**
 * 对象copy
 * @param jsonStr 复制json字符
 */
export function copy<T extends Record<string, unknown >>( jsonStr: T ): T {
    return JSON.parse( JSON.stringify( jsonStr ) );
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
        if( !Number.isInteger( randIndex ) ) return false;
        const randStr = seedStrArr[ randIndex ];

        // 判断是否重复
        if( !repeat ) {
            if( generateStr.includes( randStr ) ) continue;
        }

        generateStr.push( randStr );;
    }

    return generateStr.join( '' );
}

