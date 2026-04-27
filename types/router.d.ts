// router.d.ts
declare namespace Router {
    /** column */
    type Column = {
        label: string;  // 标签
        prop: string;   // 属性
        className?: string; // 类
        width?: number;  // 宽度
        style?: ViewProps[ 'style' ];  // 样式
    };
}