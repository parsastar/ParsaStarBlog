export const RequestStateArray = ["pending", "reject", "verified"] as const;
export type TRequestState = (typeof RequestStateArray)[number];

export const ReportReasonsArray = [
    "legacy",
    "copyright",
    "violence",
    "lie",
    "racism",
    "bad_language",
    "others",
] as const;

export type TReportReasons = (typeof ReportReasonsArray)[number];
