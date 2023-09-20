import { GuitarType } from '../../types/guitar-type.enum';


export default class UpdateGuitarDto {

  public name?: string;

  public description?: string;

  public createdDate?: string;

  public type?: GuitarType;

  public photo?: string;

  public vendor?: string;

  public price?: number;

  public stringsAmount?: number;

}
