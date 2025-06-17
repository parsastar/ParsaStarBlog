import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const BlogPaginate = ({ currentPage }: { currentPage: number }) => {
    return (
        <div className="w-[calc(25%-2px)] flex flex-col items-center gap-5 justify-center  translate-x-[.5px] p-5 ">
            <p className="text-title text-red-500"> PAGE </p>
            <div className="flex w-full   items-center justify-center gap-5 text">
                <ChevronLeft className="sm:size-8 lg:!size-14" />
                <p className="text-title "> {currentPage} </p>
                <ChevronRight className="sm:size-8 lg:!size-14" />
            </div>
        </div>
    );
};

export default BlogPaginate;
