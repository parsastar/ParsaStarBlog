import { GetBlog } from "@/app/api/blog";
import AnimatedLine from "@/components/animatedLine";
import BackButton from "@/components/backButton";
import { SingleBlogTransfer } from "@/utils/blog";
import Image from "next/image";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const rawBlog = await GetBlog({ blogId: id });
    const blog = SingleBlogTransfer({ blog: rawBlog });

    return (
        <div className="container relative   mx-auto min-h-[60svh] flex flex-col items-center">
            {/* Header */}
            <div className="w-full items-center flex justify-between">
                <BackButton />
                <p className="text-darkGrey-500 px-2 font-mono h-fit text-subtitle w-[calc(25%-1.5px)] translate-x-[.5px] text-right">
                    {blog.date}
                </p>
            </div>
            <div className="flex sm:hidden w-full">
                <AnimatedLine />{" "}
            </div>

            {/* Sticky Content + Image Section */}
            <div className="w-full  sticky top-0 flex">
                <div className="flex sm:flex-row flex-col w-full ">
                    {/* Left: Content section */}
                    <div className="w-full sm:w-1/2 aspect-square flex flex-col translate-x-[0.5px]">
                        <AnimatedLine damping={20} />

                        <div className="bg-secondary-500 px-2 py-5">
                            <h1 className="text-blogTitle lg:text-3xl font-bold font-roboto_mono">
                                {blog.title}
                            </h1>
                        </div>

                        <AnimatedLine />

                        <div className="bg-secondary-500 px-2 py-5 flex-grow overflow-y-auto">
                            <p className="text-description lg:text-subtitle  font-roboto text-darkGrey-500 leading-relaxed whitespace-pre-line">
                                {blog.body}
                            </p>
                        </div>

                        <AnimatedLine forceDraw={true} damping={40} />
                    </div>

                    {/* Right: Image section */}

                    <div className="w-full sm:order-[10] order-[-1]   sm:w-1/2 aspect-square shrink-0 left-0 bg-secondary-500 translate-x-[-1px] relative">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
