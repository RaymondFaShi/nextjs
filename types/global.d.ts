// global.d.ts
export {};

declare global {
    var log: ( identify: string|any, ...args: any ) => void;
}