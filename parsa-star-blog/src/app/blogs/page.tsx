import { GetAllBlogs } from "../api/blog";
import BlogList from "@/features/blogs/blogList";

import BlogHeader from "@/features/blogs/blogHeader";
import { Suspense } from "react";
import { Metadata } from "next";

// assuming you have this

export const metadata: Metadata = {
    title: 'Blogs',
    description: 'this the Blogs page of PARSASTAR website ',
  }
   


const Page = async () => {
    const blogWithoutImage = await GetAllBlogs();

    return (
        <div className="w-full mx-auto container flex flex-col items-center ">
            <BlogHeader />
            <Suspense fallback={<p>loading blogs </p>}>
                <BlogList FetchedBlogs={blogWithoutImage} />
            </Suspense>
        </div>
    );
};

export default Page;
