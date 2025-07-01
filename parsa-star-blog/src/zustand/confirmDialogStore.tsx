import { create } from "zustand";

interface ConfirmDialogStore {
    IsOpen: boolean;
    title?: string;
    description?: string;
    action?: () => void;
    setContent: (Content: TContent) => void;
    setClose: () => void;
}

type TContent = {
    IsOpen: boolean;
    title: string;
    description: string;
    action: () => void;
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
        set((state) => ({
            ...Content,
        })),
    setClose: () => set((state) => ({})),
}));
