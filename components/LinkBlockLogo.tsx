import { Label, Box, Flex } from 'theme-ui';

const LinkBlockLogo = (props) => {
  const url = props.url;
  let svg = null;
  const psl = require('psl');
  const parsedUrl = new URL(url);
  const parsedHost = psl.parse(parsedUrl.host);
  const domain = parsedHost.domain;
  if (domain === 'spotify.com') {
    svg = 'spotify';
  } else if (domain === 'youtube.com' || domain === 'youtu.be') {
    svg = 'youtube';
  } else if (domain === 'bandcamp.com') {
    svg = 'bandcamp';
  } else if (domain === 'soundcloud.com') {
    svg = 'soundcloud';
  } else if (domain === 'github.com') {
    svg = 'github';
  } else if (domain === 'goodreads.com') {
    svg = 'goodreads';
  } else if (domain === 'amazon.com' || domain === 'amzn.com') {
    svg = 'amazon';
  } else if (domain === 'twitter.com' || domain === 't.co') {
    svg = 'twitter';
  }
  if (svg) {
    return <img src={`/svg/${svg}.svg`} width="16px" />;
  } else {
    return <></>;
  }
};
export default LinkBlockLogo;
