import React, { Suspense } from "react";
import { GetAllBlogs } from "../api/blog";
import BlogHead from "@/features/blogs/bloghead";

const Page = async () => {
    const BlogWithoutImage = await GetAllBlogs();
    const Blogs = BlogWithoutImage.map((blog) => ({
        ...blog,
        image: `https://picsum.photos/seed/${blog.id}/500/300`,
    }));
    return (
        <Suspense fallback={"loading.."}>
            <div className="w-screen  mx-auto container flex flex-col gap-0 items-center justify-center  ">
                <BlogHead />
            </div>
        </Suspense>
    );
};

export default Page;
