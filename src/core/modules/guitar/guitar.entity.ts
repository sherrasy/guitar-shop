import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { GuitarType } from '../../../types/guitar-type.enum.js';
import { DEFAULT_STATIC_IMAGES } from '../../../utils/constant.js';

const { prop, modelOptions } = typegoose;

export interface GuitarEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'guitars',
  },
})
export class GuitarEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop()
  public createdDate!: Date;

  @prop({ default: DEFAULT_STATIC_IMAGES[0]})
  public photo!: string;

  @prop({
    required: true,
    type: () => String,
    enum: GuitarType,
  })
  public type!: GuitarType;

  @prop({ required: true,})
  public vendor!: string;

  @prop({required: true,})
  public price!: number;

  @prop({required: true,})
  public stringsAmount!: number;
}

export const GuitarModel = getModelForClass(GuitarEntity);
