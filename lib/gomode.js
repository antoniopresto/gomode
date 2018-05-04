#!/usr/bin/env node

'use strict';

const path = require('path');
const cp = require('child_process');

const handleExit = () => {
  console.log('Exiting without error.');
  process.exit();
};

const handleError = e => {
  console.error('ERROR! An error was encountered while executing');
  console.error(e);
  console.log('Exiting with error.');
  process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);

const args = process.argv.slice(2);
const name = args[0] || 'gomode-project'

cp.execSync(
  `git clone https://github.com/antoniopresto/gomode.git ${name} && rm -rf ./${name}/.git && cd ./${name} && yarn install && yarn start`,
  {
    cwd: process.env.PWD,
    stdio: 'inherit',
  }
);

handleExit();
