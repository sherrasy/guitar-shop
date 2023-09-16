import * as crypto from 'node:crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export function fillDTO<T, V>(dto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(dto, plainObject, { excludeExtraneousValues: true });
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
