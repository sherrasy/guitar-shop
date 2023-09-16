import { Length, IsInt, Min, Max, IsDateString, IsEnum, IsIn, IsOptional } from 'class-validator';
import { DescriptionLength, GuitarNameLength, PriceLimit, STRINGS_AMOUNTS, VendorLength } from '../guitar.constant.js';
import { GuitarType } from '../../../../types/guitar-type.enum.js';

export default class UpdateGuitarDto {
  @Length(GuitarNameLength.Min, GuitarNameLength.Max, {
    message: `Minimum gitar name length must be ${GuitarNameLength.Min}, maximum ${GuitarNameLength.Max}`,
  })
  @IsOptional()
  public name?: string;

  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: `Minimum description length must be ${DescriptionLength.Min}, maximum ${DescriptionLength.Max}`,
  })
  @IsOptional()
  public description?: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  @IsOptional()
  public createdDate?: Date;

  @IsEnum(GuitarType, {
    message: `Type must be one of ${Object.values(GuitarType).join(', ')}`,
  })
  @IsOptional()
  public type?: GuitarType;

  @IsOptional()
  public photo?: string;

  @Length(VendorLength.Min, VendorLength.Max, {
    message: `Minimum vendor length must be ${VendorLength.Min}, maximum ${VendorLength.Max}`,
  })
  @IsOptional()
  public vendor?: string;

  @IsInt({ message: 'Price must be an integer' })
  @Min(PriceLimit.Min, { message: `Minimum price is ${PriceLimit.Min}` })
  @Max(PriceLimit.Max, { message: `Maximum price is ${PriceLimit.Max}` })
  @IsOptional()
  public price?: number;

  @IsOptional()
  @IsIn(STRINGS_AMOUNTS, {message: `Strings amount must be one of: ${STRINGS_AMOUNTS.join(', ')}`})
  public stringsAmount?: number;

}
