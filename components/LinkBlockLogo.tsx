import { linkStyleForUrl } from '../lib/utils';
import Image from 'next/image';

const LinkBlockLogo = (props) => {
  const linkStyle = linkStyleForUrl(props.url);
  if (linkStyle.logo) {
    return <Image src={`/svg/${linkStyle.logo}.svg`} alt={linkStyle.logo} width="16px" height="16px" />;
  } else {
    return <></>;
  }
};
export default LinkBlockLogo;
