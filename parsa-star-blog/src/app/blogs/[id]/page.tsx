import { GetBlog } from "@/app/api/blog";
import { SingleBlogTransfer } from "@/utils/blog";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const Blog = await GetBlog({ blogId: id });
    const StructuredBlog = SingleBlogTransfer({ blog: Blog });
    console.log(StructuredBlog)
    return <div className="w-full container min-h-[100svh]">



    </div>;
};

export default Page;
