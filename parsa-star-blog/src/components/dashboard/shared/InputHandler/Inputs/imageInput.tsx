import { TDashboardInputProps } from "@/components/dashboard/dashboardTypes";
import Image from "next/image";
import React from "react";
import { Path, PathValue, useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
const ImageInput = <T extends Record<string, any>>({
    InputClassName,
    formKey,
    imageFile,
}: TDashboardInputProps<T>["image"]) => {
    const {
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<T>();

    const file = watch(imageFile);
    const imageUrl = file ? URL.createObjectURL(file) : watch(formKey);

    const handleDelete = () => {
        setValue(formKey, null as PathValue<T, Path<T>>);
        setValue(imageFile, null as any); // if file is File | null
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setValue(imageFile, selectedFile as PathValue<T, Path<T>>);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <div
                className={`w-full aspect-square relative flex justify-center items-center rounded-sm overflow-hidden ${
                    !imageUrl && "border border-dashed border-primary-600"
                } ${InputClassName}`}
            >
                {/* Image Preview */}
                {imageUrl ? (
                    <Image
                        alt="image-input"
                        aria-label="image-input"
                        src={imageUrl}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <ImageIcon size={"80%"} className="text-primary-600" />
                )}

                {/* Delete Button */}
                {imageUrl && (
                    <Button
                        type="button"
                        className="absolute bottom-2 left-2 z-10 bg-red-500 text-white size-10 hover:bg-red-400"
                        onClick={handleDelete}
                    >
                        <Trash2 className="w-4 h-4 " />
                    </Button>
                )}

                {/* Hidden Input */}
                {!imageUrl && (
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        onChange={handleFileChange}
                    />
                )}
            </div>
            {errors[imageFile]?.message && (
                <p className="text-sm text-red-500">
                    {errors[imageFile].message as string}
                </p>
            )}
        </div>
    );
};

export default ImageInput;
