import CreateGuitarDto from '../../dto/guitar/create-guitar';
import UpdateGuitarDto from '../../dto/guitar/update-guitar';
import CreateUserDto from '../../dto/user/create-user.dto';
import { Guitar, NewGuitar } from '../../types/guitar.type';
import { UserRegister } from '../../types/user.type';
import { formatDateToISO } from '../helpers';

export const adaptSignupToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
  });

export const adaptEditGuitarToServer =
  (guitar: Guitar): UpdateGuitarDto => ({
    price: guitar.price,
    name: guitar.name,
    photo: guitar.photo,
    type: guitar.type,
    description: guitar.description,
    createdDate: guitar.createdDate,
    vendor: guitar.vendor,
    stringsAmount: guitar.stringsAmount
  });

export const adaptCreateGuitarToServer =
  (guitar: NewGuitar): CreateGuitarDto => ({
    price: Number(guitar.price),
    name: guitar.name,
    type: guitar.type,
    description: guitar.description,
    createdDate: formatDateToISO(guitar.createdDate),
    vendor: guitar.vendor,
    stringsAmount: Number(guitar.stringsAmount)
  });

export const adaptPhotoToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('photo', file);
    return formData;
  };

