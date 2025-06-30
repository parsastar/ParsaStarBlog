"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { sortArray, TSort } from "@/constant/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownNarrowWide, RotateCcw, Rows3, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dashboardSchema = z.object({
    pageSize: z.number(),
    page: z.number(),
    search: z.string().nullable(),
    sort: z.enum(["asc", "dsc"]),
});
type TDashboardSchema = z.infer<typeof dashboardSchema>;
type TDefaults = {
    pageSize: number;
    sorting: TSort;
    search: string | undefined | null;
};

type TDashboardFiltersOptions = {
    children?: React.ReactNode;
    hasSearch?: boolean;
    hasPagination?: boolean;
    hasSorting?: boolean;
    hasPageSize?: boolean;
    hasResetButton?: boolean;
    currentValues: TDashboardSchema;
    defaultValues: TDefaults;
};
const DashboardFilters = ({
    children,
    hasPageSize,
    hasSearch,
    hasResetButton,
    hasSorting,
    currentValues,
    defaultValues,
}: TDashboardFiltersOptions) => {
    const {
        register,
        watch,
        reset,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<TDashboardSchema>({
        resolver: zodResolver(dashboardSchema),
        defaultValues: currentValues,
    });
    const router = useRouter();
    const pathname = usePathname();
    const onSubmit = (data: TDashboardSchema) => {
        const { page, pageSize, search, sort } = data;
        const params = new URLSearchParams({
            ...(String(pageSize) !== String(defaultValues.pageSize) && {
                pageSize: String(pageSize),
            }),
            ...(search &&
                search !== defaultValues.search && { search: search }),
            ...(sort !== defaultValues.sorting && { sort: sort }),
        });
        router.replace(`${pathname}?${params.toString()}`);
    };
    const DeleteSearch = () => {
        setValue("search", null);
        handleSubmit(onSubmit);
    };
    const restart = () => {
        reset({ ...defaultValues, sort: defaultValues.sorting });
        router.replace(`${pathname}`);
        console.log(watch());
    };

    return (
        <form
            className="flex font-roboto text-sm font-medium flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex w-full gap-2 justify-between lg:gap-4 items-center flex-wrap">
                {hasPageSize && (
                    <Select
                        value={String(watch("pageSize"))}
                        onValueChange={(value) => {
                            setValue("pageSize", Number(value));
                            handleSubmit(onSubmit)();
                        }}
                    >
                        <SelectTrigger
                            defaultValue={"20"}
                            hasArrow={false}
                            className=" flex-1 w-[90px] gap-2 lg:max-w-[100px] py-6"
                        >
                            <Rows3 />
                            <SelectValue placeholder="View" />
                        </SelectTrigger>
                        <SelectContent className="w-fit font-roboto text-sm font-medium ">
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                        </SelectContent>
                    </Select>
                )}
                {hasSorting && (
                    <Select
                        value={watch("sort")}
                        onValueChange={(value) => {
                            setValue("sort", value as TSort);
                            handleSubmit(onSubmit)();
                        }}
                    >
                        <SelectTrigger
                            hasArrow={false}
                            className=" flex-1 w-[90px] gap-2 lg:max-w-[100px] py-6"
                        >
                            <ArrowDownNarrowWide />
                            <SelectValue placeholder={"Sort"} />
                        </SelectTrigger>
                        <SelectContent className="w-fit font-roboto text-sm font-medium ">
                            {sortArray.map((value) => (
                                <SelectItem key={value} value={value}>
                                    {value == "asc" ? "Newest" : "Oldest"}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                {hasSearch && (
                    <div className="relative group md:order-3 order-5 w-auto flex-1  min-w-[300px] md:min-w-[400px] ">
                        <input
                            {...register("search")}
                            className="bg-secondary-500 duration-200 focus:bg-secondary-600 rounded-full font-normal text-sm focus:outline-none  p-5 w-full indent-9"
                        />
                        <button
                            className="absolute flex items-center justify-center  left-3 p-1 stroke-[1.7px] !size-10 rounded-full hover:bg-white top-1/2 -translate-y-1/2"
                            type="submit"
                        >
                            <Search className="text-primary-700" />
                        </button>
                        {currentValues.search && (
                            <button
                                onClick={DeleteSearch}
                                className="bg-primary-500  gap-2 flex items-center p-2 px-5 rounded-full text-white absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {currentValues.search}{" "}
                                <X className="stroke-[1.7px]" />{" "}
                            </button>
                        )}
                    </div>
                )}
                {hasResetButton && (
                    <button
                        className="bg-secondary-500 md:order-4 group hover:bg-secondary-600 duration-200  p-4 sm:p-5  rounded-full"
                        onClick={restart}
                    >
                        <RotateCcw className="text-primary-600 group-hover:text-primary-700" />
                    </button>
                )}
            </div>
        </form>
    );
};

export default DashboardFilters;
