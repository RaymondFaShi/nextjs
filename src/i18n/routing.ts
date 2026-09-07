// react intl
import { defineRouting } from 'next-intl/routing';

// config
import { defaultLocale, localeMapping, localePrefix, cookieName } from '@/config/locale';

// 全部语言环境
const locales = localeMapping.map( item => item.key );

export const routing = defineRouting( {
    // 支持语言环境列表
    locales,

    // 默认语言环境
    defaultLocale,

    // 语言环境前缀
    localePrefix,

    // 语言偏好, 官方逻辑仅仅在当前语言和header不一致时生成cookie
    localeCookie: false,
} );