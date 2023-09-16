import { IsEmail, IsString, Length } from 'class-validator';
import { UsernameLength,PasswordLength } from '../user.constant.js';
export default class CreateUserDto {
  @IsEmail({}, { message: 'email must be valid address' })
  public email!: string;

  @IsString({ message: 'name is required' })
  @Length(UsernameLength.Min, UsernameLength.Max, {
    message: `Min length is ${UsernameLength.Min}, max is ${UsernameLength.Max}`,
  })
  public name!: string;

  @IsString({ message: 'password is required' })
  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: `Min length is ${PasswordLength.Min}, max is ${PasswordLength.Max}`,
  })
  public password!: string;
}
