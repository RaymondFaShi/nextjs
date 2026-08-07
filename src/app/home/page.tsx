// 'use client';

// react
import React from "react";

// api
import api from '@/api/client';


export default function HomePage() {

    function test( ...args: unknown[] ) {
        log( args )
    }
    test();

    return (
        <>
            <span>this is home</span>
        </>
    );
};