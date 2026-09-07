// router.d.ts
declare namespace Router {
    /** 路由元数据 */
    interface Metadata {
        title?: string; // 标题
        icon?: unknown; // icon
        disabled?: boolean; // 是否禁用
        roles?: string[];    // 所属角色
    }


    /** 基础路由 */
    interface BaseRoute {
        name: string;   // 路由名
        loabel?: string; // 标签
        path: string;   // 路径
        redirect?: string;  // 重定向
        hidden?: boolean;   // 是否隐藏
        children?: BaseRoute[]; // 子路由组
        meta?: Metadata[];  // 元数据
    }
}