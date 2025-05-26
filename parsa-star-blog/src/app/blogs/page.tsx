import BlogHead from "@/features/blogs/blogHead";
import { GetAllBlogs } from "../api/blog";
import BlogList from "@/features/blogs/blogList";
import { BlogsDataTransfer } from "@/utils/blog";
import { PaginationList } from "@/components/paginationList";

// assuming you have this

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const Params = await searchParams;
    const blogWithoutImage = await GetAllBlogs();
    const { blogs, currentPage, totalPages } = BlogsDataTransfer({
        blogs: blogWithoutImage,
        params: Params,
    });

    return (
        <div className="w-full mx-auto container flex flex-col items-center ">
            <BlogHead />
            <BlogList blogs={blogs} />

            <div className="w-full sm:w-[calc(50%-2px)] bg-secondary-500  py-10 mx-auto -translate-x-[.5px]">
                <PaginationList
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};

export default Page;
