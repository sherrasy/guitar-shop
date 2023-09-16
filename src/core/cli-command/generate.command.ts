import got from 'got';
import { MockData } from '../../types/mock-data.type.js';
import chalk from 'chalk';
import { CliCommandInterface } from '../../types/core/cli-command.interface.js';
import GuitarGenerator from '../modules/guitar-generator/guitar-generator.js';
import { DEFAULT_USER, ErrorMessage, InfoMessage } from '../../utils/constant.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { createGuitar, getErrorMessage, getMongoURI } from '../helpers/index.js';
import { LoggerInterface } from '../../types/core/logger.interface.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { GuitarServiceInterface } from '../modules/guitar/guitar-service.interface.js';
import { DatabaseClientInterface } from '../../types/core/database-client.interface.js';
import UserService from '../modules/user/user.service.js';
import { UserModel } from '../modules/user/user.entity.js';
import { GuitarModel } from '../modules/guitar/guitar.entity.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import ConsoleLoggerService from '../logger/console.service.js';
import GuitarService from '../modules/guitar/guitar.service.js';
import { Guitar } from '../../types/guitar.type.js';
import { ConfigInterface } from '../../types/core/config.interface.js';
import ConfigService from '../config/config.service.js';
import { ConfigSchema } from '../config/config.schema.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';

  private initialData!: MockData;
  private logger: LoggerInterface;
  private userService!: UserServiceInterface;
  private guitarService!: GuitarServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private config!: ConfigInterface<ConfigSchema>;
  private login!: string;
  private password!: string;
  private host!: string;
  private port!: string;
  private dbName!: string;
  private salt!: string;

  constructor() {
    this.onRow = this.onRow.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new ConsoleLoggerService();
    this.userService = new UserService(this.logger, UserModel);
    this.guitarService = new GuitarService(this.logger, GuitarModel);
    this.databaseService = new MongoClientService(this.logger);
    this.config = new ConfigService(this.logger);
    this.login = this.config.get('DB_USER');
    this.password = this.config.get('DB_PASSWORD');
    this.host = this.config.get('DB_HOST');
    this.port = this.config.get('DB_PORT');
    this.dbName = this.config.get('DB_NAME');
    this.salt = this.config.get('SALT');
  }

  private async generateTestData(...parameters: string[]): Promise<string> {
    const [count, filepath, url] = parameters;
    const guitarCount = +count;

    try {
      this.initialData = await got.get(url).json();
    } catch {
      const message = ErrorMessage.Fetch.concat(url);
      console.log(chalk.red(message));
      return '';
    }

    const guitarGenerator = new GuitarGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < guitarCount; i++) {
      await tsvFileWriter.write(guitarGenerator.generate());
    }

    const message = InfoMessage.GenerateFile.concat(filepath);
    console.log(chalk.bold.blue(message));
    return filepath;
  }

  private async connectDatabase(): Promise<void> {
    const uri = getMongoURI(this.login, this.password, this.host, this.port, this.dbName);

    await this.databaseService.connect(uri);
  }

  private async onRow(row: string, resolve: () => void) {
    const guitar = createGuitar(row);
    await this.saveGuitar(guitar);
    resolve();
  }

  private onComplete(count: number) {
    const message = InfoMessage.ImportData.concat(count.toString());
    console.log(chalk.bold.blue(message));
    this.databaseService.disconnect();
  }

  private async saveGuitar(guitar: Guitar) {
    await this.userService.findOrCreate(DEFAULT_USER, this.salt);
    await this.guitarService.create(guitar);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const filename = await this.generateTestData(...parameters);
    await this.connectDatabase();

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('row', this.onRow);
    fileReader.on('complete', this.onComplete);

    try {
      await fileReader.read();
    } catch (error) {
      const message = getErrorMessage(error);
      const errorText = ErrorMessage.Import.concat(message);
      console.log(chalk.red(errorText));
    }

  }
}
