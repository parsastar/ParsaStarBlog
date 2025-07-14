import { pageSizes } from "@/constant/general";
import {
    TBlog,
    TBlogs,
    TFetchBlog,
    TFetchBlogs,
    TStructuredBlogs,
} from "@/types/api/blog";

export const BlogsDataTransfer = ({
    blogs,
    params,
}: {
    blogs: TFetchBlogs;
    params: { [key: string]: string | string[] | undefined };
}): TStructuredBlogs => {
    const pageSize = Number(params.pageSize || pageSizes.blogs);
    const currentPage = Number(params.page || 1);

    // adding  image and fake date to each blog
    const newBlogList = blogs.map((blog) => ({
        ...blog,
        image: `https://picsum.photos/seed/${blog.id}/500/300`,
        date: new Date(
            Date.now() - blog.id * 24 * 60 * 60 * 1000
        ).toDateString(),
    }));

    const result: TBlogs[] = []; // this is chunks o blogs based on the pageSize

    for (let i = 0; i < newBlogList.length; i += pageSize) {
        const chunk = newBlogList.slice(i, i + pageSize);
        result.push(chunk);
    }

    const totalPages = result.length;

    return {
        blogs: result[currentPage - 1] || [],
        currentPage,
        totalPages,
        pageSize,
    };
};

export const SingleBlogTransfer = ({ blog }: { blog: TFetchBlog }): TBlog => {
    // adding  image and fake date to each blog
    const newBlogList = {
        ...blog,
        image: `https://picsum.photos/seed/${blog.id}/500/300`,
        date: new Date(
            Date.now() - blog.id * 24 * 60 * 60 * 1000
        ).toDateString(),
    };

    return newBlogList;
};
