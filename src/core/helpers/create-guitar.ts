import { GuitarType } from '../../types/guitar-type.enum';
import { Guitar } from '../../types/guitar.type';

export const createGuitar = (guitarData:string):Guitar=>{

  const [name, description, photo, type, vendor,stringsAmount, price, createdDate] = guitarData.replace('\n','').split('\t');

  return {
    name,
    description,
    createdDate: new Date(createdDate),
    photo,
    type: type as GuitarType,
    vendor,
    price: +price,
    stringsAmount:+stringsAmount
  };

};
