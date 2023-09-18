import { GuitarType } from './guitar-type.enum.js';

export type Guitar = {
  id: string;
  name: string;
  description: string;
  createdDate: string;
  photo: string;
  type: GuitarType;
  vendor: string;
  price: number;
  stringsAmount: number;
}

export type Guitars = Guitar[];
