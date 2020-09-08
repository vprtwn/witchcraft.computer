import { readDict, readString, readBlockOrder, syncMetadata } from '../lib/metadataUtils';
import { BlockType } from '../lib/typedefs';
import { parseBlockId, emailFromUrl } from '../lib/utils';

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

test('readBlockOrder', () => {
  expect(readBlockOrder(null, 'foo')).toBeNull();
  let d = { foo: 'val', order: '[{"foo":1}, {"bar":2}]' };
  expect(readBlockOrder(d)).toBeNull();
  expect(readBlockOrder(d, [1])).toStrictEqual([1]);
  d = { 'b.order': 'foo' };
  expect(readBlockOrder(d)).toBeNull();
  d = { 'b.order': '{}' };
  expect(readBlockOrder(d)).toBeNull();
  d = { 'b.order': '[{"foo":1}, {"bar":2}]' };
  expect(readBlockOrder(d)).toStrictEqual([{ foo: 1 }, { bar: 2 }]);
});

test('parseBlockId', () => {
  expect(parseBlockId('foo')).toEqual(BlockType.Unknown);
  expect(parseBlockId('b.link')).toEqual(BlockType.Unknown);
  expect(parseBlockId('b.payment')).toEqual(BlockType.Payment);
  expect(parseBlockId('b.link.123')).toEqual(BlockType.Link);
  expect(parseBlockId('b.text.123')).toEqual(BlockType.Text);
});

test('emailFromUrl', () => {
  expect(emailFromUrl('http://127.0.0.1:3000/@benzguo')).toEqual('benzguo+twitter@jar.bio');
  expect(emailFromUrl('https://jar.bio/@benzguo/foo')).toBeNull();
  expect(emailFromUrl('https://flexjar.co/@shreyans')).toEqual('shreyans+twitter@jar.bio');
  expect(emailFromUrl('https://twitter.com/shreyans')).toBeNull();
});
