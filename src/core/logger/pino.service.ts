import { injectable } from 'inversify';
import { Logger, pino } from 'pino';
import { LoggerInterface } from '../../types/core/logger.interface';

@injectable()
export default class PinoService implements LoggerInterface{
  private readonly logger:Logger;

  constructor(){
    this.logger = pino();
  }

  public info(message:string, ...args:unknown[]):void{
    this.logger.info(message,...args);
  }

  public warn(message:string, ...args:unknown[]):void{
    this.logger.warn(message,...args);
  }

  public error(message:string, ...args:unknown[]):void{
    this.logger.error(message,...args);
  }

  public debug(message:string, ...args:unknown[]):void{
    this.logger.debug(message,...args);
  }
}
