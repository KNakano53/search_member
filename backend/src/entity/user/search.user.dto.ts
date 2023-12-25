import { IUsers } from './user.interface';
import {
  IsNumberString,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class SearchUserDTO implements IUsers {
  @ValidateIf((o) => o.id != '' && o.id != undefined)
  @IsString()
  @MaxLength(6, { message: '加入者番号は6文字以下で入力してください' })
  id: string;

  @ValidateIf((o) => o.name != '' && o.name != undefined)
  @IsString()
  name: string;

  @ValidateIf((o) => o.address != '' && o.address != undefined)
  @IsString()
  address: string;

  @ValidateIf((o) => o.tel != '' && o.tel != undefined)
  @IsNumberString(undefined, {
    message: '電話番号は半角数字で入力してください',
  })
  @MaxLength(11, { message: '電話番号は11桁以内で入力してください' })
  tel: string;
}
