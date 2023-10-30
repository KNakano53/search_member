export interface IResponse {
  statusCode: number;
  message: string;
  data: string;
}

export class Response implements IResponse {
  public statusCode = 200;
  public message = 'SUCCESS';
  public data: string;
  constructor(data: any) {
    this.data = JSON.stringify(data);
  }
}
