import { inject, injectable } from 'inversify';
import { ConfigSchema } from '../core/config/config.schema.js';
import { ConfigInterface } from '../types/core/config.interface.js';
import { LoggerInterface } from '../types/core/logger.interface.js';
import { AppComponent, LoggerInfoMessage } from '../utils/constant.js';

@injectable()
export default class Application {
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface)
    private readonly config: ConfigInterface<ConfigSchema>
  ) {}

  public async init() {
    this.logger.info(LoggerInfoMessage.Initialization);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
