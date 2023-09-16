import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../types/core/config.interface.js';
import { LoggerInterface } from '../types/core/logger.interface.js';
import { DatabaseClientInterface } from '../types/core/database-client.interface.js';
import { getMongoURI } from '../core/helpers/db.js';
import express, { Express } from 'express';
import { LoggerInfoMessage } from '../core/logger/logger.constant.js';
import { AppComponent } from '../types/app-component.enum.js';
import { AppPartName, ControllerRoute } from '../utils/constant.js';
import { ConfigSchema } from '../types/core/config-schema.type.js';
import { getFullServerPath } from '../core/helpers/common.js';
import { ControllerInterface } from '../types/core/controller.interface';
import { ExceptionFilterInterface } from '../types/core/exception-filter.interface';

@injectable()
export default class Application {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface)
    private readonly config: ConfigInterface<ConfigSchema>,
    @inject(AppComponent.DatabaseClientInterface)
    private readonly databaseClient: DatabaseClientInterface,
    // @inject(AppComponent.GuitarController) private readonly guitarController: ControllerInterface,
    @inject(AppComponent.UserController)
    private readonly userController: ControllerInterface,
    @inject(AppComponent.ExceptionFilterInterface)
    private readonly exceptionFilter: ExceptionFilterInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initDb(){
    this.logger.info(`${AppPartName.Db} ${LoggerInfoMessage.Init}`);
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    await this.databaseClient.connect(uri);
    this.logger.info(`${AppPartName.Db} ${LoggerInfoMessage.InitDone}`);
  }

  private async _initServer(){
    this.logger.info(`${AppPartName.Server} ${LoggerInfoMessage.Init}`);

    const port = this.config.get('PORT');
    const host = this.config.get('HOST');
    this.expressApplication.listen(port);

    const pathName = getFullServerPath(host, port);
    this.logger.info(LoggerInfoMessage.InitServerDone.concat(pathName));
  }

  private async _initController() {
    this.logger.info(`${AppPartName.Controller} ${LoggerInfoMessage.Init}`);
    // this.expressApplication.use(ControllerRoute.GuitarsList, this.guitarController.router);
    this.expressApplication.use(ControllerRoute.UsersList, this.userController.router);
    this.logger.info(`${AppPartName.Controller} ${LoggerInfoMessage.InitDone}`);
  }

  private async _initMiddleware() {
    this.logger.info(`${AppPartName.Middleware} ${LoggerInfoMessage.Init}`);
    this.expressApplication.use(express.json());
    this.logger.info(`${AppPartName.Middleware} ${LoggerInfoMessage.InitDone}`);
  }

  private async _initExceptionFilters() {
    this.logger.info(`${AppPartName.Filter} ${LoggerInfoMessage.Init}`);
    this.expressApplication.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info(`${AppPartName.Filter} ${LoggerInfoMessage.InitDone}`);
  }

  public async init() {
    this.logger.info(`${AppPartName.App} ${LoggerInfoMessage.Init}`);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    await this._initDb();
    await this._initMiddleware();
    await this._initController();
    await this._initExceptionFilters();
    await this._initServer();
  }
}
