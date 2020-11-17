import { BlockType } from '../lib/typedefs';
import { parseBlockId, parseTrayUrl } from '../lib/utils';

test('parseBlockId', () => {
  expect(parseBlockId('foo')).toEqual(BlockType.Unknown);
  expect(parseBlockId('b.link')).toEqual(BlockType.Unknown);
  expect(parseBlockId('b.link.123')).toEqual(BlockType.Link);
  expect(parseBlockId('b.text.123')).toEqual(BlockType.Text);
});

test('parseTrayUrl', () => {
  expect(parseTrayUrl('http://127.0.0.1:3000/@bgdotjpg')).toEqual(['bgdotjpg', null]);
  expect(parseTrayUrl('https://tray.club/@bgdotjpg/12345')).toEqual(['bgdotjpg', '12345']);
  expect(parseTrayUrl('https://tray.club/pay/@bgdotjpg')).toEqual(['bgdotjpg', null]);
  expect(parseTrayUrl('https://twitter.com/bgdotjpg')).toEqual([null, null]);
});
