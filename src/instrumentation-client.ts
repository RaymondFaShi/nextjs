/**
 * client端测试工具
 */

// utils
import { log } from "@/utils/global";

// 日志注册
if ( typeof window !== 'undefined' && !window.log ) {
    // 日志注册
    window.log = log;
}