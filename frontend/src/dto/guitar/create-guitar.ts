import { GuitarType } from '../../types/guitar-type.enum';

export default class CreateGuitarDto {

  public name!: string;

  public description!: string;

  public createdDate!: string;

  public type!: GuitarType;

  public vendor!: string;

  public price!: number;

  public stringsAmount!: number;

}
