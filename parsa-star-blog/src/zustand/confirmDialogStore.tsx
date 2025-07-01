import { TServerResponse } from "@/types/shared";
import { create } from "zustand";

type TAction = () => TServerResponse | Promise<TServerResponse>;

type TToastMessages = {
    success?: string;
    error?: string;
};
interface ConfirmDialogStore {
    IsOpen: boolean;
    title?: string;
    description?: string;
    action?: TAction;
    queryKeys?: any[];
    toastMessages?: TToastMessages;
    setContent: (Content: TContent) => void;
    setClose: () => void;
}

type TContent = {
    title: string;
    description: string;
    action?: TAction;
    queryKeys?: any[];
    toastMessages?: TToastMessages;
};
const initialState: Omit<ConfirmDialogStore, "setContent" | "setClose"> = {
    IsOpen: false,
    title: undefined,
    description: undefined,
    action: undefined,
};
export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
    ...initialState,
    setContent: (Content: TContent) =>
        set(() => ({
            ...Content,
            IsOpen: true,
        })),
    setClose: () => set(() => ({ ...initialState })),
}));
