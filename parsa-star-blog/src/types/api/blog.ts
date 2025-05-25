export type TBlog = {
    userId: number;
    id: number;
    title: string;
    body: string;
    image: string;
    date: string;
};
export type TBlogs = TBlog[];

export type TFetchBlog = Omit<TBlog, "image" | "date">;
export type TFetchBlogs = TFetchBlog[];
