"use client";

import dynamic from "next/dynamic";

const LazyDialog = dynamic(() => import("./MyDialog"), {
    ssr: false,
});

export function LazyDialogWrapper() {
    return <LazyDialog />;
}
