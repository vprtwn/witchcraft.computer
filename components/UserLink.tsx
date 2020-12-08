import { Flex, Link, Card, Image } from 'theme-ui';

const UserLink = (props) => {
  const data = props.data;
  const username = data['twitter_username'];

  return (
    <Flex key={username} sx={{ py: 2, alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ border: 'solid 1px gray', borderRadius: 4, px: 2, py: 0, alignItems: 'center' }}>
        <Link variant="link_no_underline" sx={{ color: 'gray', '&:visited': { color: 'gray' } }} href={`/@${username}`}>
          {`@${username}`}
        </Link>
      </Card>
    </Flex>
  );
};
export default UserLink;
