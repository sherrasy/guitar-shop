import { IsEmail, IsString, Length } from 'class-validator';
import { PasswordLength } from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'password is required' })
  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: `Min length is ${PasswordLength.Min}, max is ${PasswordLength.Max}`,
  })
  public password!: string;
}
