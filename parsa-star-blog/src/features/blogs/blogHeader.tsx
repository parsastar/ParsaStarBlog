import React from "react";
import BlogTitle from "./blogTitle";
// import BlogPaginate from "./blogPahinate";

const BlogHeader = ({ currentPage }: { currentPage: number }) => {
    return (
        <div className="w-full flex justify-center">
            {/* <BlogPaginate currentPage={currentPage} /> */}
            <BlogTitle />
            {/* <BlogPaginate currentPage={currentPage} /> */}
        </div>
    );
};

export default BlogHeader;
