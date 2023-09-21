import { LoggerInterface } from '../../types/core/logger.interface.js';

export default class ConsoleLoggerService implements LoggerInterface {

  public info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    console.error(message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }
}
