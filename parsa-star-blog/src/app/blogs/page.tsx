import BlogHead from "@/features/blogs/blogHead";
import { GetAllBlogs } from "../api/blog";
import BlogList from "@/features/blogs/blogList";
import { BlogDataTransfer } from "@/utils/blog";

// assuming you have this

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const Params = await searchParams;
    const blogWithoutImage = await GetAllBlogs();
    const { blogs, currentPage, pageSize, totalPages } = BlogDataTransfer({
        blogs: blogWithoutImage,
        params: Params,
    });

    return (
        <div className="w-full mx-auto container flex flex-col items-center ">
            <BlogHead />
            <BlogList blogs={blogs} />
        </div>
    );
};

export default Page;
