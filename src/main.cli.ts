import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/help.command.js';

const commandManager = new CLIApplication();
commandManager.registerCommands([
  new HelpCommand,
]);
commandManager.processCommand(process.argv);
