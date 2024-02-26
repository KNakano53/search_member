export type Response = {
  status: number;
  message: string[];
  data: unknown;
};

export function generateResponse(
  data: unknown,
  message?: string[],
  status?: number,
): Response {
  status ??= 200;
  message ??= [''];
  return { status: status, message: message, data: data };
}
