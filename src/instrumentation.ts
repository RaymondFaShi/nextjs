/**
 * server端测试工具
 */

// utils
import { log } from "@/utils/global";

// register全局注册
export async function register() {
    // 日志注册
    globalThis.log = log;
}