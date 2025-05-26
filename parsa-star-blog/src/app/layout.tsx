import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

import { Roboto, Roboto_Mono } from "next/font/google";
import { domAnimation, LazyMotion } from "motion/react";
import { LenisWrapper } from "@/lenisWrapper";
import Background from "@/components/background";
import Header from "@/components/header";
import Footer from "@/components/footer/footer";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
    title: "Parsa Star",
    description: "Welcome to Paras Star Blog Page",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={` ${roboto.variable} ${robotoMono.variable} antialiased h-full bg-secondary-500`}
            >
                <LazyMotion features={domAnimation} strict>
                    <Header />
                    <LenisWrapper>{children}</LenisWrapper>
                    <Background />
                    <Footer />
                </LazyMotion>
            </body>
        </html>
    );
}
