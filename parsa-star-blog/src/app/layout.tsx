import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

import { Roboto, Roboto_Mono } from "next/font/google";
import { domAnimation, LazyMotion } from "motion/react";
import { LenisWrapper } from "@/app/lenisWrapper";
import Background from "@/components/common/background";
import Header from "@/components/common/header";
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
const Thunder = localFont({
    src: [
        { path: "../fonts/Thunder-BoldLC.ttf", weight: "400" },
        { path: "../fonts/Thunder-SemiBoldLC.ttf", weight: "500" },
    ],
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
                className={`${Thunder.className} ${roboto.variable} ${robotoMono.variable} antialiased h-full bg-secondary-500`}
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
