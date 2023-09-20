import CreateUserDto from '../../dto/user/create-user.dto';
import { UserRegister } from '../../types/user.type';

export const adaptSignupToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
  });


