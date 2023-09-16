import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { GuitarServiceInterface } from './guitar-service.interface';
import { EntityName, } from '../../../utils/constant.js';
import { LoggerInterface } from '../../../types/core/logger.interface';
import { GuitarEntity } from './guitar.entity';
import CreateGuitarDto from './dto/create-guitar.js';
import UpdateGuitarDto from './dto/update-guitar.js';
import { DEFAULT_GUITARS_AMOUNT } from './guitar.constant.js';
import { LoggerInfoMessage } from '../../logger/logger.constant.js';
import { AppComponent } from '../../../types/app-component.enum.js';

@injectable()
export default class GuitarService implements GuitarServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.GuitarModel) private readonly guitarModel: types.ModelType<GuitarEntity>
  ) { }

  public async create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>> {
    const result = await this.guitarModel.create(dto);
    this.logger.info(LoggerInfoMessage.NewData.concat(EntityName.Guitar));

    return result;
  }

  public async updateById(guitarId: string, dto: UpdateGuitarDto): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel
      .findByIdAndUpdate(guitarId, dto, { new: true }).exec();
  }

  public async deleteById(guitarId: string): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel
      .findByIdAndDelete(guitarId)
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<GuitarEntity>[]> {
    const limit = count ?? DEFAULT_GUITARS_AMOUNT;
    return this.guitarModel.find({}, {}, { limit }).exec();
  }

  public async findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null> {
    return this.guitarModel.findById(guitarId).exec();
  }


  public async exists(documentId: string): Promise<boolean> {
    return (await this.guitarModel
      .exists({ _id: documentId })) !== null;
  }
}
