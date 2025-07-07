"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { domAnimation, LazyMotion } from "motion/react";

export const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 5, retry: 1 } },
});
const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <LazyMotion features={domAnimation} strict>
                {children}
            </LazyMotion>
        </QueryClientProvider>
    );
};

export default Provider;
