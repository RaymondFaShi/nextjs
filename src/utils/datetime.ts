// 时间方法
/**
 * 格式化时间
 * @param time 时间
 * @param cFormat 时间格式
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
 * 获取时间
 * @param {string} type
 * @returns {Date}
 */
export function getTime( type: string ) {
    if ( type === "start" ) {
        return new Date()
            .getTime() - 3600 * 1000 * 24 * 90;
    }

    else {
        return new Date( new Date()
            .toDateString() );
    }
}