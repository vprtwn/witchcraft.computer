import { Flex, Link, Text, Image } from 'theme-ui';

const UserLink = (props) => {
  const data = props.data;
  const username = data['twitter_username'];

  return (
    <Flex key={username} sx={{ py: 2, alignItems: 'center' }}>
      <Link variant="link_no_underline" href={`/@${username}`}>
        {`@${username}`}
      </Link>
      {data && <Image src={data['profile_image']} width="20px" sx={{ borderRadius: 99999, ml: 1 }} />}
    </Flex>
  );
};
export default UserLink;
