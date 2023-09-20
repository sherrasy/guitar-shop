import { GuitarType } from '../../types/guitar-type.enum';

export default class GuitarDto{
  public id!: string;

  public name!: string;

  public description!: string;

  public createdDate!: string;

  public photo!: string;

  public type!: GuitarType;

  public vendor!: string;

  public price!: number;

  public stringsAmount!: number;

}
