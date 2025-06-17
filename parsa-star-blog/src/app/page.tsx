import AnimatedLine from "@/components/common/animatedLine";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-[100svh]  mx-auto flex items-center justify-center container">
            <div className="flex flex-col gap-10 w-[calc(100%-2px)] translate-x-[-.5px] bg-secondary-500  items-center">
                <AnimatedLine />
                <h1 className="lg:text-title text-logo text-center px-3 sm:text-5xl  font-bold">
                    {" "}
                    Hey There Welcome to my Blogs Website{" "}
                </h1>
                <Link
                    href={"/blogs"}
                    className="flex items-center justify-center text-red-500 hover:text-secondary-500 hover:bg-red-500 duration-200 p-3 px-5 sm:p-4 sm:px-7 lg:p-5 lg:px-10 font-roboto font-medium text-subtitle sm:text-xl  lg:text-blogTitle hover:gap-5     rounded-sm border border-red-500 gap-2 "
                >
                    {" "}
                    Go to Blogs{" "}
                    <ArrowRight className="!size:20px lg:!size-[30px]" />{" "}
                </Link>
                <AnimatedLine />
            </div>
        </div>
    );
}
