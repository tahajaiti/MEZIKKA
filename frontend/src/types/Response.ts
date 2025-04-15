interface Response<T> {
    status: 'success' | 'error';
    message: string;
    data?: T;
}

export interface pagination<T> {
    current_page: number;
    data?: T;
    last_page: number;
}

export interface PaginateResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: pagination<T>;
}



export default Response;