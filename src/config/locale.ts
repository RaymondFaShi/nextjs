/** 语言环境配置 */

// interface
/** 语言映射属性 */
type LocaleMappingProps = {
    key: string;    // 键
    locale: string; // 映射语言
    name: string;   // 名字
};

// 默认语言
export const defaultLocale = 'zh-CN';

// 语言环境映射
export const localeMapping: LocaleMappingProps[] = [
    { key: 'zh-CN', locale: 'zh-CN', name: '简体中文' },
];