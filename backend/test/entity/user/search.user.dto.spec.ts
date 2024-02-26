/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate } from 'class-validator';
import { SearchUserDTO } from '../../../src/entity/user/search.user.dto';

describe('SearchUserDTO', () => {
  let dto: SearchUserDTO;

  beforeEach(() => {
    dto = new SearchUserDTO();
  });

  it('ID入力の確認', async () => {
    dto.id = '1234567'; // 7文字は許可されていない
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('maxLength');
    expect(errors[0].constraints.maxLength).toBe(
      '加入者番号は6文字以下で入力してください',
    );

    dto.id = '123456'; // 6文字は許可
    errors = await validate(dto);
    expect(errors).toHaveLength(0);

    dto.id = ''; // 空文字なら無検証
    errors = await validate(dto);
    expect(errors).toHaveLength(0);

    (dto as any).id = 123456;
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
    expect(errors[0].constraints.isString).toBe(
      '管理者番号は文字列で入力してください',
    );
  });

  it('氏名入力の確認', async () => {
    dto.name = '';
    let errors = await validate(dto);
    expect(errors).toHaveLength(0); // 空文字は許可されているためエラーは0

    (dto as any).name = 123456;
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
    expect(errors[0].constraints.isString).toBe(
      '氏名は文字列で入力してください',
    );
  });

  it('should validate address field', async () => {
    dto.address = '';
    let errors = await validate(dto);
    expect(errors).toHaveLength(0); // 空文字は許可されているためエラーは0

    (dto as any).address = 123456;
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
    expect(errors[0].constraints.isString).toBe(
      '住所は文字列で入力してください',
    );
  });

  it('should validate tel field', async () => {
    dto.tel = '123456789012'; // 12桁は許可されていない
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('maxLength');
    expect(errors[0].constraints.maxLength).toBe(
      '電話番号は11桁以内で入力してください',
    );

    dto.tel = '12345678901'; // 11桁は許可
    errors = await validate(dto);
    expect(errors).toHaveLength(0);

    dto.tel = 'abcdefghijk'; // 数字以外は許可されていない
    errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumberString');
    expect(errors[0].constraints.isNumberString).toBe(
      '電話番号は半角数字で入力してください',
    );
  });
});
