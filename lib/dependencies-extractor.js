'use strict';
const fs = require('fs');
const R = require('ramda');

const utils = require('./utils');

module.exports = (packagesFile, keys) => {
  let fileContents;

  if (!fs.existsSync(packagesFile)) {
    console.log(`File ${packagesFile} does not exist. Please check it out and try again.`);
    throw new Error('File not found');
  }
  try {
    fileContents = fs.readFileSync(packagesFile, 'utf-8');
  } catch (err) {
    throw err;
  }

  let packageJSON;

  try {
    packageJSON = JSON.parse(fileContents);
  } catch (err) {
    throw new Error('File is not valid json');
  }

  const targetDependenciesObjects = R.props(keys, packageJSON);

  return R.keys(R.reduce(R.merge, {}, R.filter(utils.isNotEmptyObject, targetDependenciesObjects)));
};
