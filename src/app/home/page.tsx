'use client';

// react
import React from "react";

// nextjs
import { headers } from "next/headers";


export default function HomePage() {
    React.useEffect( () => {
        const headerList = headers();
        log( headerList.get( 'x-trace-id' ), 1111 );
    }, [] );
    
    return (
        <>
            <span>this is home</span>
        </>
    );
};