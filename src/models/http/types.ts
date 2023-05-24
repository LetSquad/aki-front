export interface BaseResponse {
    meta: {
        code: number;
        description: string;
    };
}

export interface BasePageResponse extends BaseResponse {
    total: number;
}

export interface BasePageRequest {
    pageNumber: number;
    limit: number;
}
