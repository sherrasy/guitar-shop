import { inject, injectable } from 'inversify';
import { ConfigSchema } from '../core/config/config.schema.js';
import { ConfigInterface } from '../types/core/config.interface.js';
import { LoggerInterface } from '../types/core/logger.interface.js';
import { AppComponent, LoggerInfoMessage } from '../utils/constant.js';
import { DatabaseClientInterface } from '../types/core/database-client.interface.js';
import { getMongoURI } from '../core/helpers/db.js';

@injectable()
export default class Application {
  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface)
    private readonly config: ConfigInterface<ConfigSchema>,
    @inject(AppComponent.DatabaseClientInterface)
    private readonly databaseClient: DatabaseClientInterface
  ) {}

  private async _initDb(){
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    return this.databaseClient.connect(uri);
  }

  public async init() {
    this.logger.info(LoggerInfoMessage.InitApp);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(LoggerInfoMessage.InitDb);
    await this._initDb();
    this.logger.info(LoggerInfoMessage.InitDbDone);
  }
}
