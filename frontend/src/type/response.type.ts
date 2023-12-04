export interface Response {
  statusCode: number;
  message: string[];
  data: unknown;
}

export function generateResponse(
  data: unknown,
  message?: string[],
  statusCode?: number
): Response {
  statusCode ??= 200;
  message ??= [""];
  return { statusCode: statusCode, message: message, data: data };
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}
