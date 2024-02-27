export type Response = {
    status: number;
    message: string[];
    data: unknown;
};
export declare function generateResponse(data: unknown, message?: string[], status?: number): Response;
