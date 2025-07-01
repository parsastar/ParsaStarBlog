"use client";
import dynamic from "next/dynamic";
const ConfirmDialog = dynamic(() => import("./confirmDialog"), {
    ssr: false,
});

const LazyConfirmDialog = () => {
    return <ConfirmDialog />;
};

export default LazyConfirmDialog;
