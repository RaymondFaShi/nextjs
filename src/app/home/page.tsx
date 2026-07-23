// 'use client';

import HttpClient from "@/libaray/httpClient";
// react
import React from "react";

export default function HomePage() {
    try {
        throw new Error( 'fuck', {} );
    }

    catch( error ) {
        log( error );
    }
    return (
        <>
            <span>this is home</span>
        </>
    );
};