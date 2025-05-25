import { TBlog } from "@/types/api/blog";

export const GetAllBlogs = async (): Promise<Omit<TBlog, "image">[]> => {
    try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Network error");
        return await res.json();
    } catch (error) {
        console.error("Fetch failed", error);
        throw error; // Re-throw so UI or calling code handles it
    }
};
