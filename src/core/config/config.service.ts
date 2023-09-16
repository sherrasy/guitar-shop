import { inject, injectable } from 'inversify';
import { config } from 'dotenv';
import { configSchema } from './config.schema.js';
import { LoggerInterface } from '../../types/core/logger.interface.js';
import { ErrorMessage } from '../../utils/constant.js';
import { ConfigInterface } from '../../types/core/config.interface.js';
import { LoggerInfoMessage } from '../logger/logger.constant.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { ConfigSchema } from '../../types/core/config-schema.type.js';

@injectable()
export default class ConfigService implements ConfigInterface<ConfigSchema> {
  private readonly config: ConfigSchema;
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger:LoggerInterface
  ) {
    const parsedOutput = config();
    if(parsedOutput.error){
      throw new Error(ErrorMessage.Config);
    }
    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });
    this.config = configSchema.getProperties();
    this.logger.info(LoggerInfoMessage.Config);
  }

  public get<T extends keyof ConfigSchema>(key:T):ConfigSchema[T] {
    return this.config[key];
  }
}
