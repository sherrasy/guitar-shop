import { WriteStream, createWriteStream } from 'node:fs';
import { ChunkSize } from '../../utils/constant.js';
import { FileWriterInterface } from './file-writer.interface';

export default class TSVFileWriter implements FileWriterInterface{
  private writeStream:WriteStream;
  constructor(public readonly filename:string){
    this.writeStream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: ChunkSize.Write,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.writeStream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.writeStream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
