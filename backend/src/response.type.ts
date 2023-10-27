export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export class Response<T> implements IResponse<T> {
  public statusCode = 200;
  public message = 'SUCCESS';
  public data: T;
  constructor(data: T) {
    this.data = data;
  }
}
