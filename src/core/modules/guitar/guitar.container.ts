import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { GuitarEntity, GuitarModel } from './guitar.entity.js';
import GuitarService from './guitar.service.js';
import { GuitarServiceInterface } from './guitar-service.interface';
import { ControllerInterface } from '../../../types/core/controller.interface';
import { AppComponent } from '../../../types/app-component.enum.js';
import GuitarController from './guitar.controller.js';

export function createGuitarContainer() {
  const container = new Container();
  container.bind<GuitarServiceInterface>(AppComponent.GuitarServiceInterface).to(GuitarService).inSingletonScope();
  container.bind<types.ModelType<GuitarEntity>>(AppComponent.GuitarModel).toConstantValue(GuitarModel);
  container.bind<ControllerInterface>(AppComponent.GuitarController).to(GuitarController).inSingletonScope();
  return container;
}
