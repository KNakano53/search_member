export interface IResponse {
    statusCode: number;
    message: string;
    data: string;
}
export declare class Response implements IResponse {
    statusCode: number;
    message: string;
    data: string;
    constructor(data: any, message?: string);
}
