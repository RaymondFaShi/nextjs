// react
import React from "react";

export default function Template( { children }: Readonly<{ children: React.ReactNode }> ) {

    return (
        <>
            <span>this is user template</span>
            <br/>
            {children}
        </>
    );
};