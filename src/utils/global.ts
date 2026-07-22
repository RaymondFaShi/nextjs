// interface
import { Log } from "../../types/global";

// style
const CLIENT_STYLE_DEFAULT: string = 'color: white; padding: 2px 6px; border-radius: 3px;';
const SERVER_STYLE_INFO: string = '\x1b[44m';  // info style,
const SERVER_STYLE_SUCCESS: string = '\x1b[42m';  // success style,
const SERVER_STYLE_WARNING: string = '\x1b[43m';  // warning style,
const SERVER_STYLE_ERROR: string = '\x1b[41m';  // error style,
const SERVER_STYLE_DEBUG: string = '\x1b[100m';  // debug style,
const SERVER_STYLE_DEFAULT: string = '\x1b[0m';  // default style,透明色,

/**
 * 日志实例
 */
const log: Log = ( ...args: Array<unknown> ) => {
    // client
    if( typeof window !== 'undefined' ) {
        console.log( "%c[Client Log]", "background: #9e1068;"+ CLIENT_STYLE_DEFAULT, ...args );
    }

    // server
    else {
        console.log( '\x1b[35m'+ '[Server Log]\r\n'+ '\x1b[35m', ...args );
    }
}

log.i = ( ...args: Array<unknown> ) => {
    // client
    if( typeof window !== 'undefined' ) {
        console.info( "%cINFO", "background: #3c89e8;"+ CLIENT_STYLE_DEFAULT, ...args );
    }

    // server
    else {
        console.info( SERVER_STYLE_INFO, ...args, SERVER_STYLE_DEFAULT );
    }
}

log.s = ( ...args: Array<unknown> ) => {
    // client
    if( typeof window !== 'undefined' ) {
        console.info( "%cSUCCESS", "background: #6abe39;"+ CLIENT_STYLE_DEFAULT, ...args );
    }

    // server
    else {
        console.log( SERVER_STYLE_SUCCESS, ...args, SERVER_STYLE_DEFAULT );
    }
}

log.w = ( ...args: Array<unknown> ) => {
    // client
    if( typeof window !== 'undefined' ) {
        console.warn( ...args );
    }

    // server
    else {
        console.log( SERVER_STYLE_WARNING, ...args, SERVER_STYLE_DEFAULT );
    }
}

log.e = ( ...args: Array<unknown> ) => {
    // client
    if( typeof window !== 'undefined' ) {
        console.error( ...args );
    }

    // server
    else {
        console.log( SERVER_STYLE_ERROR, ...args, SERVER_STYLE_DEFAULT );
    }
}

log.d = ( ...args: Array<unknown> ) => {
    // client
    if( typeof window !== 'undefined' ) {
        console.info( "%cDEBUG", "background: #8c8c8c;"+ CLIENT_STYLE_DEFAULT, ...args );
    }

    // server
    else {
        console.debug( SERVER_STYLE_DEBUG, ...args, SERVER_STYLE_DEFAULT );
    }
}

export {
    log
}