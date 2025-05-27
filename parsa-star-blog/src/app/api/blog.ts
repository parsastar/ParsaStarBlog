import { TFetchBlog, TFetchBlogs } from "@/types/api/blog";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const GetAllBlogs = async (): Promise<TFetchBlogs> => {
    try {
        const res = await fetch(`${apiUrl}/posts`, {
            next: { revalidate: 60 },
        });
        console.log("Fetching blogs");
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
        const res = await fetch(`${apiUrl}/posts/${blogId}`, {
            next: { revalidate: 60 },
        });
        console.log("Fetching blog", blogId);

        if (!res.ok) throw new Error("Network error");
        return await res.json();
    } catch (error) {
        console.error("Fetch failed", error);
        throw error; // Re-throw so UI or calling code handles it
    }
};
