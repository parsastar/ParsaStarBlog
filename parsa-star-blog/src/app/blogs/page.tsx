import BlogHead from "@/features/blogs/blogHead";
import { GetAllBlogs } from "../api/blog";
import BlogList from "@/features/blogs/blogList";
import { BlogDataTransfer } from "@/utils/blog";

// assuming you have this

const Page = async () => {
    const blogWithoutImage = await GetAllBlogs();
    const blogs = BlogDataTransfer({ blogs: blogWithoutImage });
    return (
        <div className="w-full mx-auto container flex flex-col items-center ">
            <BlogHead />
            <BlogList blogs={blogs} />
        </div>
    );
};

export default Page;
