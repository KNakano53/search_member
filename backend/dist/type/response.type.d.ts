export type Response = {
    statusCode: number;
    message: string[];
    data: unknown;
};
export declare function generateResponse(data: unknown, message?: string[], statusCode?: number): Response;
