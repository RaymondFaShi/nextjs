// global.d.ts
// 控制台日志输出
interface Log {
    // eslint-disable-next-line
    ( identify: any, ...args?: Array<any> ): void;

    warn(): void;
}

/** 重定义global */
declare global {
    var log: Log;
}

export {};