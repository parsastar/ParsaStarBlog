import { TBlog, TBlogs, TFetchBlogs } from "@/types/api/blog";

export const BlogDataTransfer = ({ blogs }: { blogs: TFetchBlogs }): TBlogs =>
    blogs.map((blog, index) => ({
        ...blog,
        image: `https://picsum.photos/seed/${blog.id}/500/300`,
        date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toDateString(),
    }));
