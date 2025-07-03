import { TUserWithoutPassword } from "@/types/user/api";
import { create } from "zustand";

interface IUserDrawerStore {
    isOpen: boolean;
    selectedUser?: TUserWithoutPassword;
    setContent: (selectedUser: IUserDrawerStore["selectedUser"]) => void;
    setClose: () => void;
}
const initialProps: Pick<IUserDrawerStore, "isOpen" | "selectedUser"> = {
    isOpen: false,
    selectedUser: undefined,
};
export const useUserDrawerStore = create<IUserDrawerStore>((set) => ({
    ...initialProps,
    setContent: (selectedUser: IUserDrawerStore["selectedUser"]) =>
        set(() => ({
            selectedUser,
            isOpen: true,
        })),
    setClose: () => set(() => ({ ...initialProps })),
}));
