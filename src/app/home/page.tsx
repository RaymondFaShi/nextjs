'use client';

// react
import React from "react";

// api
import api from '@/api/client';
import BaseException from "@/exceptions/baseException";


export default function HomePage() {

    fetch( 'http://api.erpvape.com/index.php' );

    return (
        <>
            <span>this is home</span>
        </>
    );
};