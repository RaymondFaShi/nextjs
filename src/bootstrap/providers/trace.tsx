'use client';

// react
import React from "react";

// library
import Cookies from "@/libaray/cookies";

// interface
type TraceContextState = {
    sessionId: undefined| string;
    clientId: undefined| string;
};

interface Props extends React.PropsWithChildren {
    sessionId: TraceContextState[ 'sessionId' ];
    clientId: TraceContextState[ 'clientId' ];
}

// context
const TraceContext = React.createContext<TraceContextState>( { sessionId: undefined, clientId: undefined } );

// trace provider
function TraceProvier( props: Props ) {
    // props
    const { sessionId, clientId, children } = props;

    return (
        <TraceContext.Provider value={{ sessionId, clientId }}>
            {children}
        </TraceContext.Provider>
    );
}

export default TraceProvier;
export {
    TraceContext
}