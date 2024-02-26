import { generateResponse } from '../../src/type/response.type';
import { Users } from 'src/entity/user/users.entity';

describe('generateResponse', () => {
  it('should return a response object', () => {
    const data = { items: new Users() };
    const message: string[] = ['Test message'];
    const status: number = 400;

    const result = generateResponse(data, message, status);

    expect(result).toEqual({
      status: status,
      message: message,
      data: data,
    });
  });

  it('param only data', () => {
    const data = { items: new Users() };
    const message: string[] = [''];
    const status: number = 200;

    const result = generateResponse(data);

    expect(result).toEqual({
      status: status,
      message: message,
      data: data,
    });
  });

  it('param with data and message', () => {
    const data = { items: new Users() };
    const message: string[] = ['Test message'];
    const status: number = 200;

    const result = generateResponse(data, message);

    expect(result).toEqual({
      status: status,
      message: message,
      data: data,
    });
  });
});
