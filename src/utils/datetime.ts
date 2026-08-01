// 时间方法
/**
 * 解析时间
 * @param time 时间
 * @param cFormat 时间格式
 * @returns 格式化后的时间字符串
 */
export function parseTime( time: Date| string| number, cFormat: string = '{y}-{m}-{d} {h}:{i}:{s}' ): string {
    // 时间配置
    let date: Date;
    if ( time instanceof Date ) {
        date = time
    }

    else {
        if ( ( typeof time === 'string' ) ) {
            if ( ( /^[0-9]+$/.test( time ) ) ) {
                // support "1548221490638"
                time = parseInt( time )
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                // time = time.replace( new RegExp( /-/gm ), '/' )
            }
        }

        if ( ( typeof time === 'number' ) && ( time.toString().length === 10 ) ) {
            time = time * 1000
        }
        date = new Date( time );
    }

    // 格式化模板
    const formatObj: Record<string, number> = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }

    // 格式化时间字符串
    const timeStr = cFormat.replace( /{([ymdhisa])+}/g, ( result, key ) => {
        const value = formatObj[ key ]
        // Note: getDay() returns 0 on Sunday
        if ( key === 'a' ) { return [ '日', '一', '二', '三', '四', '五', '六' ][ value ] }
        return value.toString()
            .padStart( 2, '0' )
    } );

    return timeStr
}

/**
 * 格式化时间
 * @param time 时间戳
 * @param option 格式化模板
 * @returns 格式化后的时间字符串
 * @returns 格式后时间
 */
export function formatTime( time: number, option?: string ): string {
    // 时间戳处理
    if ( ( '' + time ).length === 10 ) {
        time = parseInt( time.toString() ) * 1000
    }
    else {
        time = +time
    }

    // 时间差计算
    const d = new Date( time )
    const now = Date.now()
    const diff = ( now - d.getTime() ) / 1000

    // 时间差判断
    if ( diff < 30 )  return '刚刚'
    else if ( diff < 3600 ) return Math.ceil( diff / 60 ) + '分钟前'
    else if ( diff < 3600 * 24 ) return Math.ceil( diff / 3600 ) + '小时前'
    else if ( diff < 3600 * 24 * 2 ) return '1天前'

    if ( option ) return parseTime( time, option );
    else return d.getMonth()+ 1+ '月'+ d.getDate()+ '日'+ d.getHours()+ '时'+ d.getMinutes()+ '分';
}

/**
 * 转换时间戳
 * @param {string} date
 */
export function strtotime( date?: string ): number {
    const time = date ? new Date( date ) : new Date();
    return parseInt( ( time.getTime() / 1000 ).toString()
        .split( '.' )[ 0 ] );
}