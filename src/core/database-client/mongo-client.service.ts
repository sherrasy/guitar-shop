import { inject, injectable } from 'inversify';
import { DatabaseClientInterface } from '../../types/core/database-client.interface.js';
import mongoose, { Mongoose } from 'mongoose';
import { LoggerInterface } from '../../types/core/logger.interface.js';
import { setTimeout } from 'node:timers/promises';
import { DbReconnectParam } from '../../utils/constant.js';
import { LoggerErrorMessage, LoggerInfoMessage } from '../logger/logger.constant.js';
import { AppComponent } from '../../types/app-component.enum.js';

@injectable()
export default class MongoClientService implements DatabaseClientInterface{
  private isConnected = false;
  private mongooseInstance: Mongoose|null = null;

  constructor(
    @inject(AppComponent.LoggerInterface)
    private readonly logger:LoggerInterface
  ){}

  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;
    while (attempt < DbReconnectParam.Count) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.error(LoggerErrorMessage.DbConnectFail.concat(`${attempt}`));
        await setTimeout(DbReconnectParam.Timeout);
      }
    }

    this.logger.error(LoggerErrorMessage.DbConnectMultipleFail);
    throw new Error(LoggerErrorMessage.DbConnectFail);
  }

  private async _connect(uri:string): Promise<void> {
    this.mongooseInstance = await this._connectWithRetry(uri);
    this.isConnected = true;
  }

  private async _disconnect(): Promise<void> {
    await this.mongooseInstance?.disconnect();
    this.isConnected = false;
    this.mongooseInstance = null;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error(LoggerInfoMessage.DbConnect);
    }

    this.logger.info(LoggerInfoMessage.DbConnectInProgress);
    await this._connect(uri);
    this.logger.info(LoggerInfoMessage.DbConnect);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error(LoggerInfoMessage.DbDisconnect);
    }

    await this._disconnect();
    this.logger.info(LoggerInfoMessage.DbDisconnect);
  }
}
