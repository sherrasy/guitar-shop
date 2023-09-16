import chalk from 'chalk';
import { CliCommandInterface } from '../../types/core/cli-command.interface.js';
import { CommandName, HelpMessage } from '../../utils/constant.js';

const coloredTitle = chalk.bold(HelpMessage.Title);
const coloredExample = chalk.bgGray(HelpMessage.Example);
const helpText = coloredTitle.concat('\n\n',coloredExample, '\n\n', HelpMessage.Commands);

export default class HelpCommand implements CliCommandInterface{
  public readonly name = CommandName.Help;

  public async execute(): Promise<void> {
    console.log(helpText);
  }
}
