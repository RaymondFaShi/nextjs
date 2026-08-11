// 'use client';

// react
import React from "react";

// nextjs
import { headers } from "next/headers";




export default async function HomePage() {

    const headerList = await headers();
    log( headerList.get( 'x-trace-id ' ), 1111 );
    return (
        <>
            <span>this is home</span>
        </>
    );
};