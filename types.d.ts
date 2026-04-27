/// <reference types="types" />

/** 提取某个类型 */
type ExtractKey<T, K extends keyof T> = T[ K ];

/** 提取某个类型并且必填 */
type ExtractRequiredKey<T, K extends keyof T> = RequiredKey<T, K>[ K ];

/** 指定某个类型改为选填 */
type OptionalKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 指定某个类型改为必填 */
type RequiredKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** 元数据 */
type Metadata<T> = { [ key: string ]: T };