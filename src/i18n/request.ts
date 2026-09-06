// next intl
import { getLocale, getRequestConfig } from 'next-intl/server';

// config
import { defaultLocale } from '@/config/locale';

export default getRequestConfig( async () => {
    // log( getLocale() );

    return {
        locale: defaultLocale,
        messages: ( await import( `./locales/${defaultLocale}.json` ) ).default
    };
} );