'use client';

// react
import React from "react";

export default function HomePage() {
    // log( 111 );
    React.useEffect( () => {
        log( '111' )
    }, [] )

    return (
        <>
            <span>this is home</span>
        </>
    );
};