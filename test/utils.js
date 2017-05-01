import test from 'ava';

import m from '../lib/utils';

test('groupsOf() with some items', t => {
  const source = [
    ['pkg1', 45], ['pkg2', 34],
    ['pkg3', 4], ['pkg4', 5],
    ['pkg6', 9], ['pkg10', 90],
    ['pkg11', 11]
  ];
  const expected = [
    [['pkg1', 45], ['pkg2', 34]],
    [['pkg3', 4], ['pkg4', 5]],
    [['pkg6', 9], ['pkg10', 90]],
    [['pkg11', 11]]
  ];

  t.deepEqual(m.groupsOf(2, source), expected);
});

test('groupsOf() whith n=2 and empty list', t => {
  t.deepEqual(m.groupsOf(2, []), []);
});

test('groupsOf() with n greater than list length', t => {
  t.deepEqual(m.groupsOf(2, [['pkg1', 7]]), [[['pkg1', 7]]]);
});

test('isNotEmptyObject() should return true ', t => {
  t.true(m.isNotEmptyObject({mode: 'table'}));
});

test('isNotEmptyObject() with empty object', t => {
  t.false(m.isNotEmptyObject({}));
});

test('isNotEmptyObject() with undefined', t => {
  t.false(m.isNotEmptyObject(undefined));
});

test('setDefaultIfNotInSet() when passed value in set', t => {
  t.is(m.setDefaultIfNotInSet('bar', 'baz', ['foo', 'baz']), 'baz');
});

test('setDefaultIfNotInSet() when passed value not in set', t => {
  t.is(m.setDefaultIfNotInSet('bar', 'buzz', ['foo', 'baz']), 'bar');
});

test('setDefaultIfNotInSet() with undefined passed value', t => {
  t.is(m.setDefaultIfNotInSet('bar', undefined, ['foo', 'baz']), 'bar');
});

test('repeatString()', t => {
  t.is(m.repeatString('@', 5), '@@@@@');
});

test('repeatSpace()', t => {
  t.is(m.repeatSpace(3), '   ');
});
