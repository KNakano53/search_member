export interface IResponse {
  statusCode: number;
  message: string;
  data: string;
}

export class Response implements IResponse {
  public statusCode = 200;
  public message: string;
  public data: string;

  constructor(data: any, message?: string) {
    this.message = message ?? 'SUCCESS';
    this.data = data;
  }
}
