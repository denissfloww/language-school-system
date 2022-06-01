export interface IPageDataResponse<T> {
    data: T[];
    meta: {
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
}

export interface INewPageDataResponse<T> {
    data: T[];
    count: number;
    total: number;
    page: number;
    pageCount: number;
}
