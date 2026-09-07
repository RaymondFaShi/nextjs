'use client';

// react
import React from "react";

// react-intl
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { useLocale } from "next-intl";

export default function HomePage() {
    log( useLocale(), 111 );

    return (
        <>
            <Link href='/user'>go</Link>
        </>
    );
};