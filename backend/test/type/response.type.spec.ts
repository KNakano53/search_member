import { generateResponse } from '../../src/type/response.type';
import { Users } from 'src/entity/user/users.entity';

describe('generateResponse', () => {
  it('should return a response object', () => {
    const data = { items: new Users() };
    const message: string[] = ['Test message'];
    const statusCode: number = 400;

    const result = generateResponse(data, message, statusCode);

    expect(result).toEqual({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  });

  it('param only data', () => {
    const data = { items: new Users() };
    const message: string[] = [''];
    const statusCode: number = 200;

    const result = generateResponse(data);

    expect(result).toEqual({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  });

  it('param with data and message', () => {
    const data = { items: new Users() };
    const message: string[] = ['Test message'];
    const statusCode: number = 200;

    const result = generateResponse(data, message);

    expect(result).toEqual({
      statusCode: statusCode,
      message: message,
      data: data,
    });
  });
});
