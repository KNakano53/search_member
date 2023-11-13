import { IUsers } from './user.interface';
import {
  IsNumberString,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class SearchUserDTO implements IUsers {
  @ValidateIf((o, v) => v != '' && v.length)
  @IsString()
  @MaxLength(6, { message: 'IDは6文字以下で入力してください' })
  id: string;

  @ValidateIf((o, v) => v != '' && v.length)
  @IsString()
  name: string;

  @ValidateIf((o, v) => v != '' && v.length)
  @IsString()
  address: string;

  @ValidateIf((o, v) => v != '' && v.length)
  @IsNumberString(undefined, {
    message: '電話番号は半角数字で入力してください',
  })
  @MaxLength(11, { message: '電話番号は11桁以内で入力してください' })
  tel: string;
}
