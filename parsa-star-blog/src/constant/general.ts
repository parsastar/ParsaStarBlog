export const SiteInfo = {
    siteName: "Parsastar",
};
export const Pages = [
    { name: "home", href: "/" },
    { name: "blogs", href: "/blogs" },
    { name: "Sign Up", href: "/auth/signup" },
    { name: "Sign In", href: "/auth/signin" },
    { name: "Dashboard", href: "/dashboard" },
] as const;

export const Socials = [
    {
        name: "TELEGRAM",
        href: "tg://msg?text=Mi_mensaje&to=+989303150872",
    },
    {
        name: "LINKEDIN",
        href: "https://www.linkedin.com/in/parsa-alizade-463705306/",
    },
    {
        name: "GITHUB",
        href: "https://github.com/parsastar",
    },
];

export const pageSizes = { blogs: 10 };
