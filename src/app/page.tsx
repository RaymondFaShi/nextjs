'use client'

// react
import React from "react";

// navigation
import { notFound } from "next/navigation";

// interface
export default function Page() {
    // construct
    React.useEffect( () => {
        notFound();
    } );
    return (
        <b>111</b>
    );
}