export type TServerResponse = {
    status: number;
    message: string;
};
export type TMultiPages = TServerResponse & {
    totalPages: number;
    currentPage: number;
};
