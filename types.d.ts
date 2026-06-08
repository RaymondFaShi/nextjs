/// <reference types="types" />

/** 类型元素改为必填 */
type RequiredKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** 型元素改为选填 */
type PartialKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;