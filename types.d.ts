/// <reference types="types" />

/** 混合字符 */
type MixedStr = string | number | boolean | undefined | null;

/** 非标准布尔 */
type customBool = 0| 1;

/**
 * 选项
 * @param K key
 * @param V value
 */
type OptionItem<K = number| string, V = number| string> = { label: K, value: V };

/** 类型元素改为必填 */
type RequiredKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** 型元素改为选填 */
type PartialKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;