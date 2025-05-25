"use client";
import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";

export function LenisWrapper({ children }: { children?: ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);
    useEffect(() => {
        const lenisInstance = lenisRef.current?.lenis;
        function update(time: number) {
            lenisInstance?.raf(time);
        }
        const rafId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance?.destroy();
        };
    }, []);

    return (
        <ReactLenis
            className="max-w-[100svw] overflow-hidden"
            root
            options={{ autoRaf: true }}
            ref={lenisRef}
        >
            {children}
        </ReactLenis>
    );
}
