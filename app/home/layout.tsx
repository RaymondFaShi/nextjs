// react
import React from "react";

// types
interface Props extends React.PropsWithChildren {};

// 组件
export default function HomeLayout( props: Props ) {

    return (
        <>
            <span>this is home public layout</span>
            {props.children}
        </>
    );
};