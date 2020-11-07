import { readDict, readString, readBlockOrder } from '../lib/metadataUtils';
import { BlockType } from '../lib/typedefs';
import { parseBlockId, usernameFromUrl } from '../lib/utils';

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
  expect(parseBlockId('b.link.123')).toEqual(BlockType.Link);
  expect(parseBlockId('b.text.123')).toEqual(BlockType.Text);
});

test('usernameFromUrl', () => {
  expect(usernameFromUrl('http://127.0.0.1:3000/@bgdotjpg')).toEqual('bgdotjpg');
  expect(usernameFromUrl('https://tray.club/@benzguo/foo')).toBeNull();
  expect(usernameFromUrl('https://tray.club/@shreyans')).toEqual('shreyans');
  expect(usernameFromUrl('https://twitter.com/shreyans')).toBeNull();
});
