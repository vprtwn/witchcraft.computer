import { linkStyleForUrl } from '../lib/utils';

const LinkBlockLogo = (props) => {
  const linkStyle = linkStyleForUrl(props.url);
  if (linkStyle.logo) {
    return <img src={`/svg/${linkStyle.logo}.svg`} width="16px" />;
  } else {
    return <></>;
  }
};
export default LinkBlockLogo;
