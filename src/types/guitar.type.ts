import { GuitarType } from './guitar-type.enum.js';

export type Guitar = {
  name: string;
  description: string;
  createdDate: Date;
  photo: string;
  type: GuitarType;
  vendor: string;
  price: number;
  stringsAmount: number;
}


