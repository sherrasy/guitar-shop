import got from 'got';
import { MockData } from '../../types/mock-data.type.js';
import chalk from 'chalk';
import { CliCommandInterface } from '../../types/cli-command/cli-command.interface.js';
import GuitarGenerator from '../modules/guitar-generator/guitar-generator.js';
import { ErrorMessage, InfoMessage } from '../../utils/constant.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { createGuitar, getErrorMessage } from '../helpers/index.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  private async generateTestData(...parameters:string[]): Promise<string> {
    const [count, filepath, url] = parameters;
    const offerCount = +count;

    try {
      this.initialData = await got.get(url).json();
    } catch {
      const message = ErrorMessage.Fetch.concat(url);
      console.log(chalk.red(message));
      return '';
    }

    const guitarGenerator = new GuitarGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(guitarGenerator.generate());
    }

    const message = InfoMessage.GenerateFile.concat(filepath);
    console.log(chalk.bold.blue(message));
    return filepath;
  }

  private onRow(row:string){
    const offer = createGuitar(row);
    console.log(offer);
  }

  private onComplete(count:number){
    const message = InfoMessage.ImportData.concat(count.toString());
    console.log(chalk.bold.blue(message));
  }

  public async execute(...parameters:string[]): Promise<void> {
    const filename = await this.generateTestData(...parameters);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('row', this.onRow);
    fileReader.on('complete', this.onComplete);

    try{
      await fileReader.read();
    }catch (error) {
      const message = getErrorMessage(error);
      const errorText = ErrorMessage.Import.concat(message);
      console.log(chalk.red(errorText));
    }

  }
}
