'use client'

// react
import React from "react";

// interface
interface Props {
    error: Error;
    retry: () => void;
}

export default function ErrorPage( props: Props ) {
    const { error, retry } = props;

    React.useEffect( () => {
        
    }, [ error, retry ] );


    return (
        <b>this is error</b>
    );
}