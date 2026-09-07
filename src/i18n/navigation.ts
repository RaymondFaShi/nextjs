// next-intl
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// 路由操作APIs
console.log( 'routing:', routing );
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation( routing );