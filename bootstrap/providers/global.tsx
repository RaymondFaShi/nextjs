'use client'

// react
import React from "react";

// interface
import { type Log } from "@/types/global";

/**
 * 日志实例
 */
const log: Log = Object.assign(
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

/**
 * server端注册日志
 */
globalThis.log = log;

// global provider
export default function GlobalProvier() {
    // construct
    React.useEffect( () => {
        // client注册log
        // window.log = globalThis.log;
    }, [] );

    return null;
}