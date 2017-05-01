const R = require('ramda');

const exp = module.exports;

exp.groupsOf = (n, list) => {
  const f = (acc, elem, idx) => {
    if (idx % n === 0) {
      return R.append([elem], acc);
    }
    return R.append(R.append(elem, R.last(acc)), R.init(acc));
  };
  const indexedReduce = R.addIndex(R.reduce);
  return indexedReduce(f, [], list);
};

exp.isNotEmptyObject = R.allPass([R.is(Object), R.compose(R.not, R.isEmpty)]);

exp.setDefaultIfNotInSet = (defaultVal, passedVal, set) => R.ifElse(R.contains(R.__, set), R.identity, R.always(defaultVal))(passedVal);

exp.repeatString = (source, count) => R.join('', R.repeat(source, count));

exp.repeatSpace = count => exp.repeatString(' ', count);
