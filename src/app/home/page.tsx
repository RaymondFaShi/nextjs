// 'use client';

import HttpClient from "@/libaray/httpClient";
import { secureRandNum } from "@/utils/common";
// react
import React from "react";

export default function HomePage() {
    log( secureRandNum( 1000, 9999 ) );
    return (
        <>
            <span>this is home</span>
        </>
    );
};