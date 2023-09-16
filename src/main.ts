import { Container } from 'inversify';
import 'reflect-metadata';
import Application from './app/application.js';
import { createApplicationContainer } from './app/application.container.js';
import { createUserContainer } from './core/modules/user/user.container.js';
import { AppComponent } from './types/app-component.enum.js';

async function bootstrap(){
  const container = Container.merge(createApplicationContainer(), createUserContainer(),);
  const application = container.get<Application>(AppComponent.Application);
  await application.init();
}

bootstrap();
