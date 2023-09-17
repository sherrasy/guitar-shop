import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_GUITARS_AMOUNT } from '../guitar.constant';
import { GuitarType } from '../../../../types/guitar-type.enum';


export class GuitarQuery {
  @Transform(({ value }) => +value || DEFAULT_GUITARS_AMOUNT)
  @IsNumber()
  @IsOptional()
  public limit?: number ;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;

  @IsIn(['createdDate', 'price'])
  @IsOptional()
  public sortBy?: 'createdDate' | 'price';

  @IsEnum(GuitarType)
  @IsOptional()
  public type?: GuitarType;

  @IsOptional()
  public stringsAmount?: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' ;
}
