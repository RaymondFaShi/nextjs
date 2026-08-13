'use client';

// react
import React from "react";

// nextjs
import { useRouter } from "next/navigation";


export default function HomePage() {
    const router = useRouter();

    React.useEffect( () => {
        // fetch( 'http://test.com/index.php' )
    }, [] );

    const navigateToUser = () => {
        router.push( '/user' );
    }

    return (
        <>
            <span>this is home</span><br />
            <a onClick={navigateToUser}>user</a>
        </>
    );
};