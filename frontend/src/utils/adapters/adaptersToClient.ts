import GuitarDto from '../../dto/guitar/guitar.dto';
import UserDto from '../../dto/user/user.dto';
import { Guitar, Guitars } from '../../types/guitar.type';
import { User } from '../../types/user.type';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  email: user.email,
});

export const adaptGuitarsToClient = (guitars: GuitarDto[]): Guitars =>
  guitars.map((guitar: GuitarDto) => adaptGuitarToClient(guitar));

export const adaptGuitarToClient = (guitar: GuitarDto): Guitar => ({
  id: guitar.id,
  price: guitar.price,
  name: guitar.name,
  photo: guitar.photo,
  type:guitar.type,
  description: guitar.description,
  createdDate: guitar.createdDate,
  vendor: guitar.vendor,
  stringsAmount: guitar.stringsAmount
});

