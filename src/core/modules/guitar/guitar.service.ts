import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { GuitarServiceInterface } from './guitar-service.interface';
import { EntityName } from '../../../utils/constant.js';
import { LoggerInterface } from '../../../types/core/logger.interface';
import { GuitarEntity } from './guitar.entity';
import CreateGuitarDto from './dto/create-guitar.js';
import UpdateGuitarDto from './dto/update-guitar.js';
import { DEFAULT_GUITARS_AMOUNT, DEFAULT_PAGE, DefaultSortParam } from './guitar.constant.js';
import { LoggerInfoMessage } from '../../logger/logger.constant.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { GuitarQuery } from './query/guitar-query.js';
import { DefaultObject } from '../../../types/default-object.interface';

@injectable()
export default class GuitarService implements GuitarServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface,
    @inject(AppComponent.GuitarModel)
    private readonly guitarModel: types.ModelType<GuitarEntity>
  ) {}

  public async create(
    dto: CreateGuitarDto
  ): Promise<DocumentType<GuitarEntity>> {
    const result = await this.guitarModel.create(dto);
    this.logger.info(LoggerInfoMessage.NewData.concat(EntityName.Guitar));

    return result;
  }

  public async updateById(
    guitarId: string,
    dto: UpdateGuitarDto
  ): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel
      .findByIdAndUpdate(guitarId, dto, { new: true })
      .exec();
  }

  public async deleteById(
    guitarId: string
  ): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel.findByIdAndDelete(guitarId).exec();
  }

  public async find(query: GuitarQuery): Promise<DocumentType<GuitarEntity>[]> {
    const { limit, page, sortBy, type, stringsAmount, sortDirection } = query;
    const filterParams: DefaultObject = {};
    const itemsLimit = limit || DEFAULT_GUITARS_AMOUNT;
    const currentPage = page || DEFAULT_PAGE;
    const currentSortType = sortBy || DefaultSortParam.Type;
    const currentSortDirection = sortDirection || DefaultSortParam.Direction;
    if (type) {
      filterParams.type = type.split(',');
    }
    if (stringsAmount) {
      filterParams.stringsAmount = stringsAmount.toString().split(',').map(Number);
    }
    return this.guitarModel
      .find(filterParams)
      .sort({[currentSortType]:currentSortDirection})
      .skip(currentPage * itemsLimit)
      .limit(itemsLimit)
      .exec();
  }

  // public async findAll(): Promise<DocumentType<GuitarEntity>[]> {
  //   return this.guitarModel.find().exec();
  // }

  public async findById(
    guitarId: string
  ): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel.findById(guitarId).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.guitarModel.exists({ _id: documentId })) !== null;
  }
}
