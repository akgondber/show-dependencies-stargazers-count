#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const displayStars = require('./index');

if (typeof argv.keys === 'string') {
  argv.keys = argv.keys.split(',');
}

displayStars(argv);
