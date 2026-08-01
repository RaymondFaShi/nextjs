// 验证方法库

// 验证字符特殊类型 ////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 验证字符串前缀
 * @param path 路径
 */
export function isExternal( path: string ): boolean {
    return /^(https?:|http:|mailto:|tel:|\/#)/.test( path );
}

/**
 * 验证是否url
 * @param url url
 */
export function validURL( url: string ): boolean {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test( url );
}

/**
 * 验证是否邮箱
 * @param email email
 */
export function validEmail( email: string ): boolean {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test( email );
}

/**
 * 验证身份证号(大陆)
 * @param str 字符串
 */
export function validCardNo( str: string ): boolean {
    const idCardLen18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const idCardLen15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
    return idCardLen18.test( str ) || idCardLen15.test( str );
}

/**
 * 验证是否传真
 * @param str 字符串
 */
export function validFax( str: string ): boolean {
    return /^(\d{3,4}-)?\d{7,8}$/.test( str );
}

/**
 * 验证是否手机号
 * @param str 字符串
 */
export function validPhone( str: string ): boolean {
    return /^1([345789][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test( str );
}

/**
 * 验证是否excel
 * @param file 文件
 */
export function isExcel( file: File ): boolean {
    return /\.(xlsx|xls|csv)$/.test( file.name )
}

// 验证字符类型 ////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 验证是否中文
 * @param str 字符串
 */
export function validCn( str: string ): boolean {
    return /^[\u4e00-\u9fa5]+$/.test( str );
}

/**
 * 验证是否小写
 * @param str 字符串
 */
export function validLowerCase( str: string ): boolean {
    return /^[a-z]+$/.test( str );
}

/**
 * 验证是否大写
 * @param str 字符串
 */
export function validUpperCase( str: string ): boolean {
    return /^[A-Z]+$/.test( str );
}

/**
 * 验证是否字母组成
 * @param str 字符串
 */
export function validAlpha( str: string ): boolean {
    return /^[A-Za-z]+$/.test( str );
}

// 验证规则 ////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 验证密码规则
 * @param str 字符串
 */
export function validPasswordRule( str: string ): boolean {
    return /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/.test( str );
}

// 补充全局验证 ////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 验证是否字符串
 * @param value 值
 */
export function isString( value: unknown ): boolean {
    if ( typeof value === 'string' || value instanceof String ) {
        return true;
    }
    return false;
}

/**
 * 验证是否浮点数
 * @param str 字符串
 */
export function isFloat( str: string ): boolean {
    return /^[-+]?[0-9]+\.[0-9]+$/.test( str );
}

/**
 * 验证是否数组
 * @param value 值
 */
export function isArray( value: unknown ): boolean {
    if ( typeof Array.isArray === 'undefined' ) {
        return Object.prototype.toString.call( value ) === '[object Array]';
    }
    return Array.isArray( value );
}

/**
 * 是否是object
 * @param value 值
 */
export function isObject( value: unknown ): boolean {
    return value !== null && !Array.isArray( value ) && typeof value === 'object';
}

/**
 * 是否为空
 * @param data 值
 */
export function isEmpty( data: unknown ) {
    if ( data === 0 || data === null || data === undefined ) {
        return true;
    }
    if ( typeof data === 'string' || Array.isArray( data ) ) {
        return data.length === 0;
    }
    return false;
}

/**
 * 检查值是否在数组中
 * @param value 是否在数组
 * @param array 数组
 * @returns 是否在数组中
 */
export function inArray( value: unknown, array: unknown[] ): boolean {
    return array.includes( value );
}