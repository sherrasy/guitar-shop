import chalk from 'chalk';
import { CliCommandInterface } from '../../types/cli-command/cli-command.interface.js';
import { HelpMessage } from '../../utils/constant.js';

const coloredTitle = chalk.bold(HelpMessage.Title);
const coloredExample = chalk.bgGray(HelpMessage.Example);
const helpText = coloredTitle.concat('\n\n',coloredExample, '\n\n', HelpMessage.Commands);

export default class HelpCommand implements CliCommandInterface{
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(helpText);
  }
}
