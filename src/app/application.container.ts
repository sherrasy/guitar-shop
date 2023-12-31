import { Container } from 'inversify';
import { LoggerInterface } from '../types/core/logger.interface.js';
import { ConfigInterface } from '../types/core/config.interface.js';
import PinoService from '../core/logger/pino.service.js';
import ConfigService from '../core/config/config.service.js';
import { DatabaseClientInterface } from '../types/core/database-client.interface.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';
import Application from './application.js';
import { AppComponent } from '../types/app-component.enum.js';
import { ConfigSchema } from '../types/core/config-schema.type.js';
import { ExceptionFilterInterface } from '../types/core/exception-filter.interface.js';
import ValidationExceptionFilter from '../core/exception-filters/validation.exception-filter.js';
import HttpErrorExceptionFilter from '../core/exception-filters/http-error.exception-filter.js';
import BaseExceptionFilter from '../core/exception-filters/base.exception-filter copy.js';

export function createApplicationContainer(){
  const container = new Container();
  container.bind<Application>(AppComponent.Application).to(Application).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<ConfigSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  container.bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  container.bind<ExceptionFilterInterface>(AppComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilterInterface>(AppComponent.HttpErrorExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilterInterface>(AppComponent.BaseExceptionFilter).to(BaseExceptionFilter).inSingletonScope();
  return container;
}
