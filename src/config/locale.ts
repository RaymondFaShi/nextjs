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
    { key: 'zh-CN', locale: 'zhCN', name: '简体中文' },
    { key: 'zh-TW', locale: 'zhTW', name: '繁体中文' },
];

/**
 * next-intl的localePrefix
 * @description
 * 'always' - 所有语言都显示前缀，包括默认语言 (/zh/about, /en/about)
 * 'as-needed' - 默认语言不显示前缀 (/about, /en/about)
 * 'never' - 所有语言都不显示前缀（需要其他方式识别语言，比如域名）
 */
export const localePrefix = 'never';

// 语言偏好cookie设置
export const cookieName = 'locale';