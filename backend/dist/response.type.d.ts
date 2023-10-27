export interface IResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}
export declare class Response<T> implements IResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    constructor(data: T);
}
