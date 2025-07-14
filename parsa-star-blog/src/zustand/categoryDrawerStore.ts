import { TCategory } from "@/types/categories/api";
import { create } from "zustand";

interface ICategoryDrawerStore {
    isOpen: boolean;
    selectedCategory?: TCategory;
    ParentId?: number; // this will be defined if we want to add subcategory
    setContent: (
        selectedCategory: ICategoryDrawerStore["selectedCategory"],
        parentId?: ICategoryDrawerStore["ParentId"]
    ) => void;
    setClose: () => void;
}
const initialProps: Pick<
    ICategoryDrawerStore,
    "isOpen" | "selectedCategory" | "ParentId"
> = {
    isOpen: false,
    ParentId: undefined,
    selectedCategory: undefined,
};
export const useCategoryDrawerStore = create<ICategoryDrawerStore>((set) => ({
    ...initialProps,
    setContent: (
        selectedCategory: ICategoryDrawerStore["selectedCategory"],
        parentId: ICategoryDrawerStore["ParentId"] = undefined
    ) =>
        set(() => ({
            selectedCategory,
            ParentId: parentId,
            isOpen: true,
        })),
    setClose: () => set(() => ({ ...initialProps })),
}));
