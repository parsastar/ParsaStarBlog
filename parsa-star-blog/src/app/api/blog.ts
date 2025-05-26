import { TFetchBlog, TFetchBlogs } from "@/types/api/blog";

export const GetAllBlogs = async (): Promise<TFetchBlogs> => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("Network error");
        return await res.json();
    } catch (error) {
        console.error("Fetch failed", error);
        throw error; // Re-throw so UI or calling code handles it
    }
};

export const GetBlog = async ({
    blogId,
}: {
    blogId: number | string;
}): Promise<TFetchBlog> => {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${blogId}`
        );
        if (!res.ok) throw new Error("Network error");
        return await res.json();
    } catch (error) {
        console.error("Fetch failed", error);
        throw error; // Re-throw so UI or calling code handles it
    }
};
