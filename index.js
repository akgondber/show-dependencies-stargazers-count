'use strict';
const path = require('path');
const R = require('ramda');
const repoStarsCount = require('get-repo-stargazers-count');

const Visualizer = require('./lib/visualizer');
const dependenciesExtractor = require('./lib/dependencies-extractor');

const processDependencies = (dependencies, opts) => {
  opts = R.defaultTo({}, opts);
  const items = [];
  const extractedPackages = [];
  const unavailablePackages = [];
  const allPackagesProcessed = R.equals(dependencies.length);

  const visualizer = new Visualizer(opts);

  const countPercent = R.compose(R.divide(R.__, dependencies.length), R.multiply(100), R.add);

  dependencies.forEach(packageName => {
    repoStarsCount.forGithub(packageName)
      .then(result => {
        items.push([packageName, result]);
        extractedPackages.push(packageName);
        visualizer.renderGauge(countPercent(extractedPackages.length, unavailablePackages.length));

        if (allPackagesProcessed(R.add(extractedPackages.length, unavailablePackages.length))) {
          visualizer.render(items);
        }
      })
      /* eslint-disable handle-callback-err, no-unused-vars */
      .catch(err => {
        unavailablePackages.push(packageName);
        visualizer.renderGauge(countPercent(extractedPackages.length, unavailablePackages.length));

        if (allPackagesProcessed(R.add(extractedPackages.length, unavailablePackages.length))) {
          visualizer.render(items);
        }
      });
      /* eslint-enable handle-callback-err, no-unused-vars */
  });
};

module.exports = opts => {
  opts = R.defaultTo({}, opts);
  const sourceDir = R.defaultTo(process.cwd(), opts.dir);
  const sourceFile = R.defaultTo('package.json', opts.file);
  const packagesFile = path.join(sourceDir, sourceFile);
  const keys = opts.keys || ['dependencies', 'devDependencies'];

  const dependencies = dependenciesExtractor(packagesFile, keys);

  if (dependencies.length === 0) {
    console.log(`This project does not seem o be have any dependenices within ${keys.join(',')} sections.`);
    return;
  }

  processDependencies(dependencies, R.pick(['mode', 'order'], opts));
};
