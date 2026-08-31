'use client';

// react
import React, { useReducer } from "react";

// libaray
import localStorage from '@/libaray/localStorage';

// reducer

// subscribe


export default function HomePage() {
    // const res = React.useSyncExternalStore(  );
    React.useEffect( () => {
        // localStorage.set( 'test', 'fuck' )
        localStorage.clear();
    }, [] );

    return (
        <>
            <span>this is home</span><br />
            {/* <button onClick={ () => setData( { loaing: true } ) }>+</button> */}
        </>
    );
};