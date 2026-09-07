// language proxy

// next
import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";

// interface
interface Locale {
    locale: string; // 语言
    q: number;  // 等级
};

/**
 * 获取客户端语言环境
 * @param acceptLanguage header accept-language
 */
function getClientLocales( acceptLanguage: string ): Locale[] {
    // 处理accept language
    const languages = acceptLanguage.split( ',' ).map<Locale>( language => {
        // 语言分组
        const [ locale, q ] = language.split( ';' );

        // locale
        return { locale, q: parseFloat( q?.split( '=' )[ 1 ] || '1' ) };
    } );

    return languages;
}

const localeProxy: Middleware.Proxy<{ locale: string }> = async ( request: NextRequest ) => {
    // 获取已经选择的本地语言环境
    const localSelectLocale = request.cookies.get( 'locale' )?.value;
    // log( await getLocale() );
    if( !localSelectLocale ) {
        // 获取客户端accept language
        const acceptLanguage = request.headers.get( 'accept-language' )|| '';

        // 全部语言环境
        const locales = getClientLocales( acceptLanguage );

        return { locale: locales[ 0 ].locale };
    }

    return { locale: localSelectLocale };
};

export default localeProxy;