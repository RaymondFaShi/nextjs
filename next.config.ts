// next
import type { NextConfig } from "next";

// next intl
import createNextIntlPlugin from 'next-intl/plugin';

// nextConfig
const nextConfig: NextConfig = {
    /* config options here */

    // 严格模式
    reactStrictMode: false,
};

// next-intl
const withNextIntl = createNextIntlPlugin();

export default withNextIntl( nextConfig );
