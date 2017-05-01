import path from 'path';
import test from 'ava';

import m from '../lib/dependencies-extractor';

const packagesFile = path.join(__dirname, './fixtures/packageExample.json');

test('should return all dependency names for specified keys', t => {
  const expected = [
    'async', 'got',
    'request', 'ora',
    'ava', 'xo'
  ];
  t.deepEqual(m(packagesFile, ['dependencies', 'devDependencies']), expected);
});

test('should return an empty array for not existing keys', t => {
  t.is(m(packagesFile, ['notExistingKey']).length, 0);
});

test('should throw an error (File not found)', t => {
  const error = t.throws(() => {
    m(path.join(__dirname, './fixtures/not-existing-file.json'), ['dependencies']);
  });
  t.is(error.message, 'File not found');
});

test('should throw an error (File is not valid json)', t => {
  const error = t.throws(() => {
    m(path.join(__dirname, './fixtures/notValidPackage.json'), ['dependencies']);
  });
  t.is(error.message, 'File is not valid json');
});
