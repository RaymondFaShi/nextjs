// 'use client';

import HttpClient from "@/libaray/httpClient";
import { objectMerge, secureRandNum } from "@/utils/common";
import { getTime, parseTime } from "@/utils/datetime";
// react
import React from "react";

export default function HomePage() {
    log( getTime( 'start' ) );
    return (
        <>
            <span>this is home</span>
        </>
    );
};