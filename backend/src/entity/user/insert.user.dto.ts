import { IUsers } from './user.interface';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class InsertUserDTO implements IUsers {
  @IsEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(127, { message: '氏名は11桁以内で入力してください' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(127, { message: '住所は11桁以内で入力してください' })
  address: string;

  @IsNotEmpty()
  @IsNumberString(undefined, {
    message: '電話番号は半角数字で入力してください',
  })
  @MaxLength(11, { message: '電話番号は11桁以内で入力してください' })
  tel: string;
}
