import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/auth",
                destination: "/signup",
                permanent: true,
            },
            {
                source: "/login",
                destination: "/signin",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [new URL("https://picsum.photos/seed/**")],
    },
};

export default nextConfig;
