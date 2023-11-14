export interface IResponse {
    statusCode: number;
    message: string[];
    data: unknown;
}
export declare class Response implements IResponse {
    statusCode: number;
    message: string[];
    data: unknown;
    constructor(data: unknown, message?: string[]);
}
