'use client'

// react
import React from "react";

// utils
import { log } from "@/utils/global";

// global provider
export default function GlobalProvier() {
    // construct
    React.useEffect( () => {
        // client注册log
        window.log = log;
    }, [] );

    return null;
}