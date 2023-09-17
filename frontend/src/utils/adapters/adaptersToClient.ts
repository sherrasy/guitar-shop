import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import UserDto from '../../dto/user/user.dto';
import { User } from '../../types/user.type';

export const adaptLoginToClient = (user: UserWithTokenDto): User => ({
  name: user.name,
  email: user.email,
  token: user.token,
});

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  email: user.email,
});
