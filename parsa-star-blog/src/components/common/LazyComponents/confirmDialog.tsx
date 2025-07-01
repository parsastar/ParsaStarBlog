"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useConfirmDialogStore } from "@/zustand/confirmDialogStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/app/provider";
import { LoaderCircle } from "lucide-react";

export default function ConfirmDialog() {
    const {
        IsOpen,
        setClose,
        title,
        description,
        action,
        toastMessages,
        queryKeys,
    } = useConfirmDialogStore();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            if (action) {
                const res = await action();
                if (res.status !== 200) {
                    throw new Error(
                        res.message ||
                            toastMessages?.error ||
                            "Some thing went wrong"
                    );
                }
                return res;
            }
        },
    });
    const handleAction = async () => {
        try {
            await mutateAsync(undefined, {
                onSuccess: async (res) => {
                    toast.success(
                        toastMessages?.success ||
                            res?.message ||
                            "everything went as you wished"
                    );
                    if (queryKeys) {
                        await queryClient.invalidateQueries({
                            queryKey: queryKeys,
                        });
                    }
                },
            });
        } catch (error) {
            toast.error(
                toastMessages?.error ||
                    (error as string) ||
                    "Some thing went wrong"
            );
        }
    };
    return (
        <Dialog
            open={isPending || IsOpen}
            onOpenChange={IsOpen ? setClose : undefined}
        >
            <DialogContent className="!font-roboto flex-col gap-10">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex sm:justify-start bg-slate-50">
                    <DialogClose asChild>
                        <Button disabled={isPending} variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        className="flex gap-1 items-center"
                        disabled={isPending}
                        onClick={handleAction}
                    >
                        Confirm{" "}
                        {isPending && (
                            <LoaderCircle className={"animate-spin"} />
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
