// react
import { createContext } from "react";

// interface
type Context = {
    clientId: undefined| string;
};

// context
const TraceContext = createContext<Context>( undefined );

// trace provider
export default function TraceProvier( props: React.PropsWithChildren ) {
    // props
    const { children } = props;

    return (
        <TraceContext.Provider cliendId={'1'}>
            {children}
        </TraceContext.Provider>
    );
}