"use client";
import dynamic from "next/dynamic";
const ConfirmDialog = dynamic(() => import("./confirmDialog"), {
    ssr: false,
});

export const LazyConfirmDialog = () => {
    return <ConfirmDialog />;
};


