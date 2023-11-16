export type Response = {
  statusCode: number;
  message: string[];
  data: unknown;
};

export function generateResponse(
  data: unknown,
  message?: string[],
  statusCode?: number,
): Response {
  statusCode ??= 200;
  message ??= [''];
  return { statusCode: statusCode, message: message, data: data };
}
