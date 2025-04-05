interface Response<T> {
    status: 'success' | 'error';
    message: string;
    data?: T;
}

export default Response;