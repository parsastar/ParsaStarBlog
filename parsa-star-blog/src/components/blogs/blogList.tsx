import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";


import AnimatedLine from "@/components/common/animatedLine";
import { TBlog, TBlogs } from "@/types/blogs/api";

const BlogList = ({ blogs }: { blogs: TBlogs }) => {
    const MappedBlogs: TBlogs[] = [];
    for (let i = 0; i < blogs.length; i += 2) {
        const chunk = blogs.slice(i, i + 2);
        MappedBlogs.push(chunk);
    }

    return (
        <div className="w-full items-center justify-center  grid grid-cols-1">
            {MappedBlogs.map((blogs, index) => (
                <React.Fragment key={index}>
                    <AnimatedLine />
                    <div className="w-full z-[3] relative grid grid-cols-1 sm:grid-cols-2 gap-0 ">
                        {blogs.map((blog, i) => (
                            <BlogCard key={blog.id} blog={blog} index={i} />
                        ))}
                    </div>
                </React.Fragment>
            ))}
            <AnimatedLine />
        </div>
    );
};

export default BlogList;

const BlogCard = ({ blog, index }: { blog: TBlog; index: number }) => {
    return (
        <div
            key={blog.id}
            className={` w-[calc(100%-1.5px)] translate-x-[${
                index % 2 == 0 ? "-.5px" : "-1px"
            }] group mx-auto duration-200  hover:bg-secondary-600 origin-center   p-8 lg:p-14 `}
        >
            <div className="flex flex-col  h-full   duration-200 group-hover:bg-secondary-600 bg-secondary-500 gap-5">
                <div className="w-full shrink-0 grow-0  overflow-hidden rounded-md aspect-[16/11] border border-primary-500 relative">
                    <Image
                        src={blog.image}
                        fill
                        className="group-hover:scale-[1.1] origin-center duration-500"
                        style={{ objectFit: "cover" }}
                        alt={blog.title}
                    />
                </div>
                <div className="flex h-full font-roboto flex-col justify-between gap-10">
                    <div className="flex flex-col gap-2">
                        <p className="font-roboto_mono font-medium text-xl line-clamp-4 lg:text-blogTitle text-black">
                            {blog.title}
                        </p>
                        <p className=" font-normal text-description text-darkGrey-400">
                            {blog.body}
                        </p>
                    </div>
                    <div className="border-t flex justify-between border-b border-primary-500 w-full mx-auto py-3">
                        <Link
                            href={`/blogs/${blog.id}`}
                            className="flex gap-2 text-red-500 hover:gap-3 duration-200 items-center"
                        >
                            <p className="text-subtitle  font-normal">
                                {" "}
                                Discover More{" "}
                            </p>
                            <ArrowRight />
                        </Link>
                        <p className="text-description text-darkGrey-500">
                            {blog.date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
