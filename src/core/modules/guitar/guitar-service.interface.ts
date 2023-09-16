import { DocumentType } from '@typegoose/typegoose';
import { DocumentExistsInterface } from '../../../types/core/document-exists.interface.js';
import CreateGuitarDto from './dto/create-guitar.js';
import UpdateGuitarDto from './dto/update-guitar.js';
import { GuitarEntity } from './guitar.entity.js';

export interface GuitarServiceInterface extends DocumentExistsInterface {
  create(dto: CreateGuitarDto): Promise<DocumentType<GuitarEntity>>;
  updateById(guitarId: string, dto:UpdateGuitarDto): Promise<DocumentType<GuitarEntity> | null>;
  deleteById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
  find(count?:number): Promise<DocumentType<GuitarEntity>[]>;
  findById(guitarId: string): Promise<DocumentType<GuitarEntity> | null>;
}
