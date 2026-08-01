// 助手函数

// 引入函数
import { objectMerge } from "./common";

/**
 * 寻找缓存
 * @param config
 * @returns 返回缓存数据
 */
export function cachedFind<T extends Record<string, unknown>>(
    config: {
        cacheData: T[],
        label?: keyof T,
        value?: unknown,
        labelField?: string,
        valueField?: string,
    }
): unknown {
    const { cacheData, label, value, labelField, valueField } = config;

    // 初始化返回数据
    let resultData  = undefined;

    // 默认索引
    const labelIndex = labelField?? 'label';
    const valueIndex = valueField?? 'value';

    // 查找数据
    cacheData.find( item => {
        if( typeof label !== 'undefined' ) {   // 如果有label值，查询对应value值
            const currentLabel = item[ labelIndex ];
            if( currentLabel === label ) {
                resultData = item[ valueIndex ];
                return true;
            }
        }

        if( typeof value !== 'undefined' ) {    // 如果有value值，查询对应label值
            const currentValue = item[ valueIndex ];
            if( currentValue === value ) {
                resultData = item[ labelIndex ];
                return true;
            }
        }

        return false;
    } );

    return resultData;
}

/**
 * 重构树结构
 * @param datas 数据组
 * @param fields 提取字段
 * @param childrenField 子节点字段
 * @param callback 回调操作
 */
export function recordTree<T extends Record<string, unknown>>(
    config: {
        datas: T[],
        fields?: ( keyof T )[],
        childrenField?: keyof T,
        callback?: ( data: T ) => T
    }
): T[] {
    // 解构数据
    const { datas, fields, childrenField = 'children', callback } = config;

    // 返回数据
    return datas.map( item => {
        // 初始化数据
        let data = {} as T;

        // 提取数据
        if( fields && fields.length > 0 ) {
            fields.forEach( key => {
                if( Object.hasOwn( item, key ) ) {
                    data[ key as keyof T  ] = item[ key ] as T[ keyof T ];
                }
            } );
        }

        else data = item;

        // 子节点处理
        if( Object.hasOwn( item, childrenField ) && Array.isArray( item[ childrenField ] ) && ( item[ childrenField ] as T[] ).length > 0 ) {
            // 递归子节点数据
            data[ childrenField as keyof T ] = recordTree( { datas: item[ childrenField ] as T[], fields, childrenField, callback } ) as T[ keyof T];
        }

        // 回调操作
        if( typeof callback === 'function' ) objectMerge( data, callback( data as T ) );

        // 返回数据
        return data
    } );
}

/**
 * 构建树结构
 * @param datas 数据组
 * @param parent_identify 父级标识字段
 * @param parent_id 父级ID
 * @param fields 提取字段
 * @param callback 回调操作
 */
export function buildTree<T extends Record<string, unknown>>(
    config: {
        datas: T[],
        parentField?: keyof T,
        parentId?: number,
        fields?: ( keyof T )[],
        childrenField?: keyof T,
        callback?: ( data: T ) => T
    }
) {
    // 解构数据
    const { datas, parentField = 'parentId', parentId = 0, fields, childrenField = 'children', callback } = config;

    // 初始化返回数据
    const resultData: T[] = [];

    // 遍历数据
    datas.filter( item => {
        // 父级判断
        if( Object.hasOwn( item, parentField ) && item[ parentField ] === parentId ) {
            // 初始化数据
            let data = {} as T;

            // 提取数据
            if( fields && fields.length > 0 ) {
                fields.forEach( key => {
                    if( Object.hasOwn( item, key ) ) {
                        data[ key as keyof T  ] = item[ key ] as T[ keyof T ];
                    }
                } );
            }

            else data = item;

            // 子节点处理
            if( Object.hasOwn( item, childrenField ) && Array.isArray( item[ childrenField ] ) && ( item[ childrenField ] as T[] ).length > 0 ) {
                // 递归子节点数据
                data[ childrenField as keyof T ] = buildTree( { datas: item[ childrenField ] as T[], parentField, parentId: item[ 'id' ] as number, fields, childrenField, callback } ) as T[ keyof T];
            }

            // 回调操作
            if( typeof callback === 'function' ) objectMerge( data, callback( data as T ) );

            // 返回数据
            resultData.push( data );
        }
    } );

    return resultData;
}