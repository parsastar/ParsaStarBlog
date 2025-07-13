import { z } from "zod";
import { serverCategorySchemas } from "./schema/serverSchema";
import { TServerResponse } from "../shared";

const { create: _create, update: _update } = serverCategorySchemas;

export type TCategory = z.infer<typeof _create> & {
    id: number;
    updated_at: Date;
    created_at: Date;
};

export type TShapedCategory = TCategory & { children?: TCategory[] }; // since were limiting categories to have maximum 1 children we make a type for easier use

export type TGetCategory = TServerResponse & {
    category: TCategory;
};
export type TGetCategoryList = TServerResponse & {
    categories: TShapedCategory[];
};

export type TPostCategoryPayload = z.infer<typeof _create>;
export type TPutCategoryPayload = z.infer<typeof _update>;
