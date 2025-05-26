"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            className="flex items-center w-[calc(25%-1.5px)] rounded-none translate-x-[.5px] justify-center text-red-500 bg-secondary-500 duration-200 hover:text-secondary-500 hover:bg-red-500 p-10"
            onClick={() => router.back()}
            aria-label="get Back"
        >
            <ArrowLeft className="!size-10" />
        </Button>
    );
}