import { GuitarType } from './guitar-type.enum';

export type Guitar = {
  name: string;
  description: string;
  createdDate: Date;
  photo: string;
  type: GuitarType;
  vendor: string;
  stringsAmount: number;
  price: number;
}


