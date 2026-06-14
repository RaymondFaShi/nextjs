'use client'

// react
import React from "react";

// utils
import { log } from "@/utils/global";

// client端注册
if ( typeof window !== 'undefined' && !window.log ) {
    // 日志注册
    window.log = log;
}

// server端注册
else {
    // 日志注册
    globalThis.log = log;
}

// global provider
export default function GlobalProvier() {
    return null;
}