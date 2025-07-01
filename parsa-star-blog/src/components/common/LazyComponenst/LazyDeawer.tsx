"use client";

import dynamic from "next/dynamic";

const LazyDrawer = dynamic(() => import("./MyDrawer"), {
    ssr: false,
    loading: () => <p>Loading drawer...</p>,
});

export function LazyDrawerWrapper() {
    return <LazyDrawer />;
}
