import { Expose } from 'class-transformer';
import { GuitarType } from '../../../../types/guitar-type.enum';


export default class GuitarRdo{
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public description!: string;

  @Expose()
  public createdDate!: string;

  @Expose()
  public photo!: string;

  @Expose()
  public type!: GuitarType;

  @Expose()
  public vendor!: string;

  @Expose()
  public price!: number;

  @Expose()
  public stringsAmount!: number;

}
