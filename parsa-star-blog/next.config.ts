import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/auth",
                destination: "/auth/signup",
                permanent: true,
            },
            {
                source: "/signin",
                destination: "/auth/signin",
                permanent: true,
            },
            {
                source: "/signup",
                destination: "/auth/signup",
                permanent: true,
            },
            {
                source: "/login",
                destination: "/auth/signin",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            new URL("https://picsum.photos/seed/**"),
            new URL("https://res.cloudinary.com/**"),
        ],
    },
};

export default nextConfig;
