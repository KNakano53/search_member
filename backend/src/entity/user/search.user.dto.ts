import { IUsers } from './user.interface';
import {
  IsNumberString,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class SearchUserDTO implements IUsers {
  @ValidateIf((o) => o.id != '' && o.id != undefined)
  @IsString({ message: '管理者番号は文字列で入力してください' })
  @MaxLength(6, { message: '加入者番号は6文字以下で入力してください' })
  id: string;

  @ValidateIf((o) => o.name != '' && o.name != undefined)
  @IsString({ message: '氏名は文字列で入力してください' })
  name: string;

  @ValidateIf((o) => o.address != '' && o.address != undefined)
  @IsString({ message: '住所は文字列で入力してください' })
  address: string;

  @ValidateIf((o) => o.tel != '' && o.tel != undefined)
  @IsNumberString(undefined, {
    message: '電話番号は半角数字で入力してください',
  })
  @MaxLength(11, { message: '電話番号は11桁以内で入力してください' })
  tel: string;
}
