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

  @IsNotEmpty({ message: '氏名は必須です' })
  @IsString({ message: '氏名は文字列で入力してください' })
  @MaxLength(127, { message: '氏名は127文字以内で入力してください' })
  name: string;

  @IsNotEmpty({ message: '住所は必須です' })
  @IsString({ message: '住所は文字列で入力してください' })
  @MaxLength(127, { message: '住所は127文字以内で入力してください' })
  address: string;

  @IsNotEmpty({ message: '電話番号は必須です' })
  @IsNumberString(undefined, {
    message: '電話番号は半角数字で入力してください',
  })
  @MaxLength(11, { message: '電話番号は11桁以内で入力してください' })
  tel: string;
}
