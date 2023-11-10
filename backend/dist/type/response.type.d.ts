export interface IResponse {
    statusCode: number;
    message: string;
    data: any;
}
export declare class Response implements IResponse {
    statusCode: number;
    message: string;
    data: any;
    constructor(data: any, message?: string);
}
