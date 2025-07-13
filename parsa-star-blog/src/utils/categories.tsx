import { TCategory, TShapedCategory } from "@/types/categories/api";
import { TCategoryIconOptions } from "@/types/categories/shared";

import {
    Cpu,
    Code2,
    CloudSun,
    HeartPulse,
    BookOpen,
    Wallet,
    Utensils,
    Film,
    Plane,
    Sofa,
} from "lucide-react";
import { ReactElement } from "react";
export const shapeCategories = (categories: TCategory[]) => {
    const shapedCategories: TShapedCategory[] = [];
    const categoryMap = new Map<number, TShapedCategory>();

    categories.forEach((cat) => {
        categoryMap.set(cat.id, {
            ...(cat as TCategory),
            children: undefined,
        });
    });
    categoryMap.forEach((category) => {
        if (category.parent_id) {
            const parent = categoryMap.get(category.parent_id);
            if (parent) {
                if (!parent.children) parent.children = [];
                parent.children.push(category);
            }
        } else {
            shapedCategories.push(category);
        }
    });
    return shapedCategories;
};

export const findCategoryIcon = (
    selectedIcon: TCategoryIconOptions
): ReactElement<any, any> => {
    switch (selectedIcon) {
        case "Education":
            return <BookOpen />;
        case "Food":
            return <Utensils />;
        case "Health":
            return <HeartPulse />;
        case "Weather":
            return <CloudSun />;
        case "Travel":
            return <Plane />;
        case "Entertainment":
            return <Film />;
        case "Programming":
            return <Code2 />;
        case "Finance":
            return <Wallet />;
        case "Lifestyle":
            return <Sofa />;
        case "Technology":
            return <Cpu />;
    }
};
