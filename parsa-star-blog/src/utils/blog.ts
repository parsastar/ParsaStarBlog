import { pageSizes } from "@/constant/general";
import { TBlogs, TFetchBlogs, TStructuredBlogs } from "@/types/api/blog";

export const BlogDataTransfer = ({
    blogs,
    params,
}: {
    blogs: TFetchBlogs;
    params: { [key: string]: string | string[] | undefined };
}): TStructuredBlogs => {
    const pageSize = Number(params.pageSize || pageSizes.blogs);
    const currentPage = Number(params.page || 1);
    console.log(pageSize);
    // adding  image and fake date to each blog
    const newBlogList = blogs.map((blog, index) => ({
        ...blog,
        image: `https://picsum.photos/seed/${blog.id}/500/300`,
        date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toDateString(),
    }));

    const result: TBlogs[] = []; // this is chunks o blogs based on the pageSize

    for (let i = 0; i < newBlogList.length; i += pageSize) {
        const chunk = newBlogList.slice(i, i + pageSize);
        result.push(chunk);
    }

    const totalPages = result.length;
    console.log(result);
    return {
        blogs: result[currentPage - 1] || [],
        currentPage,
        totalPages,
        pageSize,
    };
};
