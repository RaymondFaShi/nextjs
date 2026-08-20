'use client';

// react
import React from "react";

// nextjs
import Link from "next/link";
import BaseException from "@/exceptions/baseException";

// libaray
import SessionStorage from "@/libaray/sessionStorage";
import Cookies from "@/libaray/cookies";

export default function HomePage() {
    React.useEffect( () => {
        SessionStorage.set( 'sessionId', crypto.randomUUID() )
    }, [] )

    return (
        <>
            <span>this is home</span><br />
            <Link href={'/user'}>go</Link>
        </>
    );
};