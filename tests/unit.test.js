import { readDict, readString, readWidgetOrder, syncMetadata } from '../lib/metadataUtils';

test('syncMetadata', () => {
  let local = {};
  let remote = {};
  expect(syncMetadata(local, remote)).toStrictEqual({});
  local = { foo: 'val' };
  remote = {};
  expect(syncMetadata(local, remote)).toStrictEqual({ foo: 'val' });
  local = {};
  remote = { foo: 'val' };
  expect(syncMetadata(local, remote)).toStrictEqual({ foo: 'val' });
  // clear remote keys if explicitly set to null
  local = { foo: null };
  remote = { foo: 'val' };
  expect(syncMetadata(local, remote)).toStrictEqual({ foo: null });
  // overwrite remote arrays with local
  local = { foo: [1, 2] };
  remote = { foo: '[1, 2, 3]' };
  expect(syncMetadata(local, remote)).toStrictEqual({ foo: '[1,2]' });
  // overwrite remote strings with local
  local = { foo: 'bar' };
  remote = { foo: 'baz' };
  expect(syncMetadata(local, remote)).toStrictEqual({ foo: 'bar' });
  // merge remote dicts with local
  local = { meta: { tj_v: null } };
  remote = { meta: '{"tj_t":"bar"}' };
  let result = syncMetadata(local, remote);
  expect(JSON.parse(result['meta'])).toStrictEqual({ tj_v: null, tj_t: 'bar' });
  local = { meta: { tj_v: 1, tj_t: 'foo' } };
  remote = { meta: '{"tj_v":null}' };
  result = syncMetadata(local, remote);
  expect(JSON.parse(result['meta'])).toStrictEqual({ tj_v: 1, tj_t: 'foo' });
});

test('readString', () => {
  expect(readString(null, 'foo')).toBeNull();
  let d = {};
  expect(readString(d, 'foo')).toBeNull();
  expect(readString(d, 'foo', 'default')).toBe('default');
  d = { foo: 'val', bar: 1, baz: '{}', qux: null };
  expect(readString(d, 'foo')).toBe('val');
  expect(readString(d, 'bar')).toBeNull();
  expect(readString(d, 'bar', 'default')).toBe('default');
  expect(readString(d, 'baz')).toBeNull();
  expect(readString(d, 'qux')).toBeNull();
});

test('readDict', () => {
  expect(readDict(null, 'foo')).toBeNull();
  let d = {};
  expect(readDict(d, 'foo')).toBeNull();
  expect(readDict(d, 'foo', { foo: 'default' })).toStrictEqual({ foo: 'default' });
  d = { foo: 'val', bar: '[1,2]', baz: '{"foo":"val"}', qux: null };
  expect(readDict(d, 'foo')).toBeNull();
  expect(readDict(d, 'bar')).toBeNull();
  expect(readDict(d, 'bar', 'default')).toBe('default');
  expect(readDict(d, 'baz')).toStrictEqual({ foo: 'val' });
  expect(readDict(d, 'qux')).toBeNull();
});

test('readWidgetOrder', () => {
  expect(readWidgetOrder(null, 'foo')).toBeNull();
  let d = { foo: 'val', order: '[{"foo":1}, {"bar":2}]' };
  expect(readWidgetOrder(d)).toBeNull();
  expect(readWidgetOrder(d, [1])).toStrictEqual([1]);
  d = { 'w.order': 'foo' };
  expect(readWidgetOrder(d)).toBeNull();
  d = { 'w.order': '{}' };
  expect(readWidgetOrder(d)).toBeNull();
  d = { 'w.order': '[{"foo":1}, {"bar":2}]' };
  expect(readWidgetOrder(d)).toStrictEqual([{ foo: 1 }, { bar: 2 }]);
});
