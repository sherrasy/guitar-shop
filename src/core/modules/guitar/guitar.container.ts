import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AppComponent } from '../../../utils/constant.js';
import { GuitarEntity, GuitarModel } from './guitar.entity.js';
import GuitarService from './guitar.service.js';
import { GuitarServiceInterface } from './guitar-service.interface.js';

export function createGuitarContainer() {
  const container = new Container();
  container.bind<GuitarServiceInterface>(AppComponent.GuitarServiceInterface).to(GuitarService).inSingletonScope();
  container.bind<types.ModelType<GuitarEntity>>(AppComponent.GuitarModel).toConstantValue(GuitarModel);

  return container;
}
