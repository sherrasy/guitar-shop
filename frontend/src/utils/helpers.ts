import { AxiosError } from 'axios';
import { AxiosErrorResponse } from '../types/axios-error-response.type';
import { GuitarType } from '../types/guitar-type.enum';
import { DATE_LOCALE, GuitarFilterLabel, PRICE_FORMAT_PATTERN } from './constant';

export const checkValidity = (value: string, pattern: RegExp) => value !== '' && pattern.test(value);

export const formatDateToLocale = (date:string) => new Date(date).toLocaleDateString(DATE_LOCALE);

export const formatDateToISO = (date:string) => new Date(date).toISOString();

export const formatPrice = (price:number) => price.toString().replace(PRICE_FORMAT_PATTERN, ' ');

export const getGuitarTypeWithName = ()=> Object.entries(GuitarType).map(([key,value])=>{
  const name = Object.entries(GuitarFilterLabel).find((item)=> item[0] === key)?.[1];
  return{
    type:value,
    name
  };
});

export const getValidationErrorMessages = (error:AxiosError<AxiosErrorResponse>) => error.response?.data.details.map((item)=> `${item.property}: ${item.messages[0]}`).join('\r\n');

