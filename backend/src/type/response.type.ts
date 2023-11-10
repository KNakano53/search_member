export interface IResponse {
  statusCode: number;
  message: string;
  data: any;
}

export class Response implements IResponse {
  public statusCode = 200;
  public message: string;
  public data: any;

  constructor(data: any, message?: string) {
    this.message = message ?? 'SUCCESS';
    this.data = data;
  }
}
