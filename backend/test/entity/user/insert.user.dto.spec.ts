/* eslint-disable @typescript-eslint/no-explicit-any */
import { InsertUserDTO } from '../../../src/entity/user/insert.user.dto';
import { validate } from 'class-validator';

describe('InsertUserDTO', () => {
  let dto: InsertUserDTO;

  beforeEach(() => {
    dto = new InsertUserDTO();
  });

  it('ID入力の確認', async () => {
    dto.name = 'test name';
    dto.address = 'test address';
    dto.tel = '0120';

    dto.id = '';
    let errors = await validate(dto);
    expect(errors).toHaveLength(0);

    dto.id = 'test id';
    errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isEmpty');
    expect(errors[0].constraints.isEmpty).toBe('id must be empty');
  });

  it('氏名入力の確認', async () => {
    dto.address = 'test address';
    dto.tel = '0120';

    dto.name = ''; // 空文字列は不正
    let errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[0].constraints.isNotEmpty).toBe('氏名は必須です');

    (dto as any).name = 123; //文字列以外は不正
    errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isString');
    expect(errors[0].constraints.isString).toBe(
      '氏名は文字列で入力してください',
    );

    dto.name = 'a'.repeat(128); // 128文字は不正
    errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('maxLength');
    expect(errors[0].constraints.maxLength).toBe(
      '氏名は127文字以内で入力してください',
    );

    dto.name = 'a'.repeat(127); // 127文字は正しい
    errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('住所入力の確認', async () => {
    dto.name = 'test name';
    dto.tel = '0120';

    dto.address = ''; // 空文字列は不正
    let errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[0].constraints.isNotEmpty).toBe('住所は必須です');

    (dto as any).address = 123; //文字列以外は不正
    errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isString');
    expect(errors[0].constraints.isString).toBe(
      '住所は文字列で入力してください',
    );

    dto.address = 'a'.repeat(128); // 128文字は不正
    errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('maxLength');
    expect(errors[0].constraints.maxLength).toBe(
      '住所は127文字以内で入力してください',
    );

    dto.address = 'a'.repeat(127); // 127文字は正しい
    errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('電話番号入力の確認', async () => {
    dto.name = 'test name';
    dto.address = 'test address';

    dto.tel = ''; // 空文字列は不正
    let errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    expect(errors[0].constraints.isNotEmpty).toBe('電話番号は必須です');

    dto.tel = 'test'; // 文字列は不正
    errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('isNumberString');
    expect(errors[0].constraints.isNumberString).toBe(
      '電話番号は半角数字で入力してください',
    );

    dto.tel = '0'.repeat(12); // 12文字は不正
    errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty('maxLength');
    expect(errors[0].constraints.maxLength).toBe(
      '電話番号は11桁以内で入力してください',
    );

    dto.tel = '0'.repeat(11); // 11文字は正しい
    errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
