import { Length, IsInt, Min, Max, IsDateString, IsEnum, IsIn } from 'class-validator';
import { DescriptionLength, GuitarNameLength, PriceLimit, STRINGS_AMOUNTS, VendorLength } from '../guitar.constant';
import { GuitarType } from '../../../../types/guitar-type.enum.js';

export default class UpdateGuitarDto {
  @Length(GuitarNameLength.Min, GuitarNameLength.Max, {
    message: `Minimum gitar name length must be ${GuitarNameLength.Min}, maximum ${GuitarNameLength.Max}`,
  })
  public name?: string;

  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: `Minimum description length must be ${DescriptionLength.Min}, maximum ${DescriptionLength.Max}`,
  })
  public description?: string;

  @IsDateString({}, { message: 'postDate must be valid ISO date' })
  public createdDate?: Date;

  @IsEnum(GuitarType, {
    message: `Type must be one of ${Object.values(GuitarType).join(', ')}`,
  })
  public type?: GuitarType;

  public photo?: string;

  @Length(VendorLength.Min, VendorLength.Max, {
    message: `Minimum vendor length must be ${VendorLength.Min}, maximum ${VendorLength.Max}`,
  })
  public vendor?: string;

  @IsInt({ message: 'Price must be an integer' })
  @Min(PriceLimit.Min, { message: `Minimum price is ${PriceLimit.Min}` })
  @Max(PriceLimit.Max, { message: `Maximum price is ${PriceLimit.Max}` })
  public price?: number;

  @IsIn(STRINGS_AMOUNTS, {message: `Strings amount must be one of: ${STRINGS_AMOUNTS.join(', ')}`})
  public stringsAmount?: number;

}
