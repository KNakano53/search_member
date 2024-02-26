export interface Response {
  status: number;
  message: string[];
  data: unknown;
}

export function generateResponse(
  data: unknown,
  message?: string[],
  status?: number
): Response {
  status ??= 200;
  message ??= [""];
  return { status: status, message: message, data: data };
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
