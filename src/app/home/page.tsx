// 'use client';

// react
import React from "react";

// api
import api from '@/api/client';


export default function HomePage() {

    const test = api.request( '' );
    

    return (
        <>
            <span>this is home</span>
        </>
    );
};