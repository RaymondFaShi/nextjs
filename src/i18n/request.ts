// next
// import { locale as rootParamsLocale } from 'next/root-params';
// import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

// next intl
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';


export default getRequestConfig( async ( { locale } ) => {
    // 如果没有传入的locale
    /** 这段逻辑是在[locale]时生效，利润/zh /en */
    // if( !locale ) {
    //     获取通配目录的locale
    //     const rootLocale = await rootParamsLocale();

    //     如果没有当前通配目录
    //     if( hasLocale( routing.locales, rootLocale ) ) {
    //         locale = rootLocale;
    //     }

    //     如果还是没有
    //     else {
    //         // 没有找到页面
    //         notFound();
    //     }
    // }

    /** 这段逻辑是针对手动语言选择, 路径为根目录 */
    if( !locale ) {
        // 获取header上下文的locale
        const requestHeaders = await headers();
        const requestLocale = requestHeaders.get( 'x-app-locale' )?? undefined;

        // 如果有请求的locale，并且在语言包列表
        if( requestLocale && hasLocale( routing.locales, requestLocale ) ) {
            locale = requestLocale;
        }

        // 如果没有取默认
        else {
            locale = routing.defaultLocale;
        }
    }

    return {
        locale: locale,
        messages: ( await import( `./locales/${locale}.json` ) ).default
    };
} );