// global.d.ts

// 控制台日志输出
interface Log {
    ( ...args: Array<unknown> ): void;
    i( ...args: Array<unknown> ): void;  // info
    s( ...args: Array<unknown> ): void;  // success
    w( ...args: Array<unknown> ): void;  // warning
    e( ...args: Array<unknown> ): void;  // error
    d( ...args: Array<unknown> ): void;  // debug
}

/** 重定义global */
declare global {
    // server日志
    var log: Log;

    // client日志
    interface Window {
        log: Log
    }
}

export {
    Log
};