#!/usr/bin/env node
import 'reflect-metadata';
import CLIApplication from './app/cli.js';
import GenerateCommand from './core/cli-command/generate.command.js';
import HelpCommand from './core/cli-command/help.command.js';

const commandManager = new CLIApplication();
commandManager.registerCommands([
  new HelpCommand,new GenerateCommand
]);
commandManager.processCommand(process.argv);
