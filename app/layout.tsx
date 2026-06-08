// nextjs
import type { Metadata } from "next";

// proviers
// import GlobalProvider from '@/bootstrap/providers/global';

// global
import "@/utils/global";

// head
export const metadata: Metadata = {
    title: "React管理系统模板框架",
    description: "React+nextjs+redux管理系统通用模板框架",
};

// root
export default function RootLayout( { children }: Readonly<{ children: React.ReactNode }> ) {
    return (
        <html lang="zh-CN">
            <body>
                {/* <GlobalProvider /> */}
                {children}
            </body>
        </html>
    );
}