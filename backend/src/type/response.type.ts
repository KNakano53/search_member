export interface IResponse {
  statusCode: number;
  message: string[];
  data: unknown;
}

export class Response implements IResponse {
  public statusCode = 200;
  public message: string[];
  public data: unknown;

  constructor(data: unknown, message?: string[]) {
    this.message = message ?? ['SUCCESS'];
    this.data = data;
  }
}
