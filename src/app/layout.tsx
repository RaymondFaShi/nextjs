// nextjs
import type { Metadata } from "next";
import { headers } from "next/headers";

// proviers
// import GlobalProvider from '@/bootstrap/providers/global';
import TraceProvider from '@/bootstrap/providers/trace';    // trace
import { NextIntlClientProvider } from 'next-intl';   // i18n

// middleware
import { SESSION_ID_KEY, CLIENT_ID_KEY } from "@/middleware/proxy/trace";

// head
export const metadata: Metadata = {
    title: "React管理系统模板框架",
    description: "React+nextjs+redux管理系统通用模板框架",
};

// root
export default async function Layout( { children }: Readonly<{ children: React.ReactNode }> ) {
    // 获取追踪链
    const sessionId = ( await headers() ).get( SESSION_ID_KEY )?? undefined;
    const clientId = ( await headers() ).get( CLIENT_ID_KEY )?? undefined;

    return (
        <html lang="zh-CN">
            <body>
                {/* <GlobalProvider /> */}
                <TraceProvider sessionId={sessionId} clientId={clientId}>
                    <NextIntlClientProvider>
                        {children}
                    </NextIntlClientProvider>
                </TraceProvider>
            </body>
        </html>
    );
}