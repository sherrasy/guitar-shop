import dayjs from 'dayjs';
import { generateRandomValue, generateRandomVendor, getRandomItem } from '../../helpers/index.js';
import { MockData } from '../../../types/mock-data.type.js';
import { GuitarGeneratorInterface } from './guitar-generator.interface.js';
import { PriceLimit } from '../guitar/guitar.constant.js';

const WeekDay = {
  First:1,
  Last:7
}as const;

export default class GuitarGenerator implements GuitarGeneratorInterface {
  constructor(private readonly mockData:MockData){}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const photo = getRandomItem<string>(this.mockData.photos);
    const type = getRandomItem<string>(this.mockData.guitarTypes);
    const vendor = generateRandomVendor();
    const stringsAmount = getRandomItem<string>(this.mockData.stringsAmount);
    const price = generateRandomValue(PriceLimit.Min,PriceLimit.Max);
    const createdDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day').toISOString();
    return [name, description, photo, type, vendor,stringsAmount, price, createdDate ].join('\t');
  }

}
