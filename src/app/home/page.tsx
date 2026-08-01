// 'use client';

import HttpClient from "@/libaray/httpClient";
import { objectMerge, secureRandNum } from "@/utils/common";
import { getTime, parseTime } from "@/utils/datetime";
// react
import React from "react";

function test( config ) {
    const { a, b = 'fuck none' } = config;
    log( a, b );
}

export default function HomePage() {
    
    test( { a: 1, b: 2 } )
    
    return (
        <>
            <span>this is home</span>
        </>
    );
};