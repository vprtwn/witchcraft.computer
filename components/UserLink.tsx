import { Flex, Link, Text, Image } from 'theme-ui';

const UserLink = (props) => {
  const data = props.data;
  const username = data['twitter_username'];

  return (
    <Flex key={username} sx={{ py: 2, alignItems: 'center' }}>
      <Link variant="link_no_underline" href={`/@${username}`}>
        {`@${username}`}
      </Link>
    </Flex>
  );
};
export default UserLink;
