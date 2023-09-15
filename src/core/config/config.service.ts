import { inject, injectable } from 'inversify';
import { config } from 'dotenv';
import { ConfigSchema, configSchema } from './config.schema.js';
import { LoggerInterface } from '../../types/core/logger.interface.js';
import { AppComponent, ErrorMessage, LoggerInfoMessage } from '../../utils/constant.js';
import { ConfigInterface } from '../../types/core/config.interface.js';

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
