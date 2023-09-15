import got from 'got';
import { MockData } from '../../types/mock-data.type.js';
import chalk from 'chalk';
import { CliCommandInterface } from '../../types/cli-command/cli-command.interface.js';
import GuitarGenerator from '../modules/guitar-generator/guitar-generator.js';
import { ErrorMessage, InfoMessage } from '../../utils/constant.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = +count;

    try {
      this.initialData = await got.get(url).json();
    } catch {
      const message = ErrorMessage.Fetch.concat(url);
      console.log(chalk.red(message));
      return;
    }

    const guitarGenerator = new GuitarGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(guitarGenerator.generate());
    }

    const message = InfoMessage.Generate.concat(filepath);
    console.log(chalk.bold.blue(message));
  }
}
