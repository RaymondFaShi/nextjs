// interface
import { Log } from "../../types/global";

/**
 * 日志实例
 */
export const log: Log = Object.assign(
    ( ...args: Array<unknown> ) => {
        // client
        if( typeof window !== 'undefined' ) {
            console.log( ...args );
        }

        // server
        else {
            console.log( '\x1b[0m', ...args, '\x1b[0m' );
        }
    },
    {
        // style
        CLIENT_STYLE_DEFAULT: 'color: white; padding: 2px 6px; border-radius: 3px;',
        SERVER_STYLE_INFO: '\x1b[44m',  // info style,
        SERVER_STYLE_SUCCESS: '\x1b[42m',  // success style,
        SERVER_STYLE_WARNING: '\x1b[43m',  // warning style,
        SERVER_STYLE_ERROR: '\x1b[41m',  // error style,
        SERVER_STYLE_DEBUG: '\x1b[100m',  // debug style,
        SERVER_STYLE_DEFAULT: '\x1b[0m',  // default style,透明色,

        i( ...args: Array<unknown> ) {
            // client
            if( typeof window !== 'undefined' ) {
                console.info( "%cINFO", "background: #3c89e8;"+ this.CLIENT_STYLE_DEFAULT, ...args );
            }

            // server
            else {
                console.info( this.SERVER_STYLE_INFO, ...args, this.SERVER_STYLE_DEFAULT );
            }
        },
        s( ...args: Array<unknown> ) {
            // client
            if( typeof window !== 'undefined' ) {
                console.info( "%cSUCCESS", "background: #6abe39;"+ this.CLIENT_STYLE_DEFAULT, ...args );
            }

            // server
            else {
                console.log( this.SERVER_STYLE_SUCCESS, ...args, this.SERVER_STYLE_DEFAULT );
            }
        },
        w( ...args: Array<unknown> ) {
            // client
            if( typeof window !== 'undefined' ) {
                console.warn( ...args );
            }

            // server
            else {
                console.log( this.SERVER_STYLE_WARNING, ...args, this.SERVER_STYLE_DEFAULT );
            }
        },
        e( ...args: Array<unknown> ) {
            // client
            if( typeof window !== 'undefined' ) {
                console.error( ...args );
            }

            // server
            else {
                console.log( this.SERVER_STYLE_ERROR, ...args, this.SERVER_STYLE_DEFAULT );
            }
        },
        d( ...args: Array<unknown> ) {
            // client
            if( typeof window !== 'undefined' ) {
                console.info( "%cDEBUG", "background: #8c8c8c;"+ this.CLIENT_STYLE_DEFAULT, ...args );
            }

            // server
            else {
                console.debug( this.SERVER_STYLE_DEBUG, ...args, this.SERVER_STYLE_DEFAULT );
            }
        }
    }
);