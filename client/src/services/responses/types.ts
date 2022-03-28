export interface ILoginResponse {
    access_token: string;
    refresh_token: string;
}

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
