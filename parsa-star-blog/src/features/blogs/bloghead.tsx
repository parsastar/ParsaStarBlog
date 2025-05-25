import React from "react";

const BlogHead = () => {
    return (
        <div className="gridTwoBlocks flex  gap-5 flex-col h-fit bg-secondary-500  p-10">
            <h1 className=" w-full text-center text-subtitle font-roboto_mono text-red-500">
                BLOGS
            </h1>
            <h2 className="text-title font-medium leading-[70px] text-center">
                Catch Up on the Newest in{" "}
                <span className="text-red-500"> PARSSTAR</span> Website
            </h2>
        </div>
    );
};

export default BlogHead;
