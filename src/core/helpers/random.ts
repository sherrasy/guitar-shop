import { VendorLength } from '../modules/guitar/guitar.constant.js';

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export const generateRandomVendor = () => {
  const vendorLength = generateRandomValue(VendorLength.Min, VendorLength.Max);
  let result = '';
  while (result.length < vendorLength){
    result += Math.random().toString(36).substring(2);
  }
  return result.substring(0, vendorLength);
};
