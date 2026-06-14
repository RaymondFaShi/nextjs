// interface
import { type Log } from "@/types/global";

/**
 * 日志实例
 */
export const log: Log = Object.assign(
    ( identify: unknown, ...args: Array<unknown> ) => {
        console.log( identify, ...args );
    },
    {
        i( ...args: [ unknown, Array<unknown> ] ) {
            console.log( args );
        },
        s( ...args: [ unknown, Array<unknown> ] ) {
            console.log( args )
        },
        w( ...args: [ unknown, Array<unknown> ] ) {
            console.log( args );
        },
        e( ...args: [ unknown, Array<unknown> ] ) {
            console.log( args );
        },
        d( ...args: [ unknown, Array<unknown> ] ) {
            console.log( args );
        }
    }
);