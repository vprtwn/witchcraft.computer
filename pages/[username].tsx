import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextBlock from '../components/TextBlock';
import LinkBlock from '../components/LinkBlock';
import PageFooter from '../components/PageFooter';
import { getOrCreateCustomer, getCustomer } from '../lib/ops';
import { reorder, remove, add, unprefixUsername, generateBlockId, parseBlockId } from '../lib/utils';
import { postMetadataUpdate, readBlockOrder, readDict } from '../lib/metadataUtils';
import { Direction, BlockType } from '../lib/typedefs';
import { useRouter } from 'next/router';
import { Box, IconButton, Flex, Card, Button, Text, Label, Badge } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';
import fetchJson from '../lib/fetchJson';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditButtonIcon from '../components/EditButtonIcon';
import ViewButtonIcon from '../components/ViewButtonIcon';
import AddButtonIcon from '../components/NewButtonIcon';
import BackButtonIcon from '../components/BackButtonIcon';
import SignOutButtonIcon from '../components/SignOutButtonIcon';
import NewMenu from '../components/NewMenu';

let DEBUG = true;
if (process.env.NODE_ENV === 'production') {
  DEBUG = false;
}

const UserPage = (props) => {
  const {
    query: {},
  } = useRouter();

  const defaultText = 'edit me';
  const connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID}&scope=read_write&state=${props.username}`;

  const disconnectStripe = async function () {
    try {
      await fetchJson('/api/disconnect_stripe', {
        method: 'POST',
      });
      setStripeAccount(null);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  // block ordering, [{i: "b.text.A1B2"}, ...]
  const initialOrder = readBlockOrder(props.metadata) || [];
  const [order, setOrder] = useState(initialOrder);
  const [showingNewMenu, setShowingNewMenu] = useState(false);
  const [previewing, setPreviewing] = useState(DEBUG ? false : true);
  const [metadata, setMetadata] = useState(props.metadata);
  const initialStripeAccount = readDict(props.metadata, 'stripeAccount');
  const [stripeAccount, setStripeAccount] = useState(initialStripeAccount);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const syncOrder = async function (newOrder: Record<string, string>[], removedId: string | null = null) {
    try {
      await postMetadataUpdate('b.order', newOrder, props.customerId, props.username, removedId);
      // don't need to call setMetadata if updating order only
    } catch (e) {
      console.error(e);
    }
  };

  const syncNewBlock = async function (id: string, value: string, order: Record<string, string>[]) {
    try {
      setShowingNewMenu(false);
      const newMetadata = await postMetadataUpdate(id, value, props.customerId, props.username, null, order);
      console.table(newMetadata);
      setMetadata(newMetadata);
    } catch (e) {
      console.error(e);
    }
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(order, result.source.index, result.destination.index);
    setOrder(newItems);
    syncOrder(newItems);
  };

  const moveBlock = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(order, index, newIndex);
    setOrder(newItems);
    syncOrder(newItems);
  };

  const removeBlock = (index: number) => {
    const result = remove(order, index);
    setOrder(result.items);
    syncOrder(result.items, result.removedId);
  };

  const addTextBlock = () => {
    const id = generateBlockId(BlockType.Text);
    const newItem = { i: id };
    // TODO #28: updating order without persisting TextBlock can result in stale order data
    const newItems = add(order, newItem);
    setOrder(newItems);
    syncNewBlock(id, defaultText, newItems);
  };

  const addLinkBlock = (content: any) => {
    const id = generateBlockId(BlockType.Link);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    const value = JSON.stringify({ text: content.text, url: content.url });
    setOrder(newItems);
    syncNewBlock(id, value, newItems);
  };

  return (
    <Layout>
      {props.error && <pre>{JSON.stringify(props.error, null, 2)}</pre>}
      {!props.error && (
        <>
          <Header profileImage={props.profileImage} name={props.name} username={props.username} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {order &&
                    order.map((orderItem, index) => {
                      return (
                        <Draggable
                          key={orderItem.i}
                          draggableId={orderItem.i}
                          index={index}
                          isDragDisabled={!props.signedIn || previewing}
                        >
                          {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              {parseBlockId(orderItem.i) === BlockType.Text && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <TextBlock
                                    default={defaultText}
                                    previewing={previewing}
                                    id={orderItem.i}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    hideToolbar={previewing}
                                    metadata={metadata}
                                    username={props.username}
                                    customerId={props.customerId}
                                    signedIn={props.signedIn}
                                    onDown={() => {
                                      moveBlock(index, Direction.Down);
                                    }}
                                    onUp={() => {
                                      moveBlock(index, Direction.Up);
                                    }}
                                    onDelete={() => {
                                      removeBlock(index);
                                    }}
                                  />
                                </Box>
                              )}
                              {parseBlockId(orderItem.i) === BlockType.Link && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <LinkBlock
                                    id={orderItem.i}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    hideToolbar={previewing}
                                    metadata={metadata}
                                    username={props.username}
                                    customerId={props.customerId}
                                    signedIn={props.signedIn}
                                    onDown={() => {
                                      moveBlock(index, Direction.Down);
                                    }}
                                    onUp={() => {
                                      moveBlock(index, Direction.Up);
                                    }}
                                    onDelete={() => {
                                      removeBlock(index);
                                    }}
                                  />
                                </Box>
                              )}
                              {/* TODO: hide payment block if payments disabled */}
                              {parseBlockId(orderItem.i) === BlockType.Unknown && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <Card variant="block">
                                    <Box>{`Unsupported block type ${orderItem.i}`}</Box>
                                    <pre>{props.metadata[orderItem.i]}</pre>
                                  </Card>
                                </Box>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {showingNewMenu && !previewing && (
            <NewMenu
              onClick={(result) => {
                switch (result.type as BlockType) {
                  case BlockType.Text:
                    addTextBlock();
                    break;
                  case BlockType.Link:
                    addLinkBlock(result);
                    break;
                  case BlockType.Unknown:
                    // no-op
                    break;
                }
              }}
            />
          )}

          {props.signedIn && (
            <Flex sx={{ py: 3, mx: 2, justifyContent: 'space-between' }}>
              <Box sx={{}}>
                <IconButton
                  onClick={() => {
                    setPreviewing(!previewing);
                  }}
                >
                  {previewing ? <EditButtonIcon /> : <ViewButtonIcon />}
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  sx={{ fontSize: '24px', visibility: previewing ? 'hidden' : 'visible' }}
                  variant={showingNewMenu ? 'iconselected' : 'icon'}
                  onClick={() => {
                    setShowingNewMenu(!showingNewMenu);
                  }}
                >
                  {showingNewMenu ? <BackButtonIcon /> : <AddButtonIcon />}
                </IconButton>
              </Box>
            </Flex>
          )}
          {props.signedIn && !previewing && (
            <Card
              sx={{
                p: 3,
                my: 2,
                bg: 'white',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
                borderRadius: 8,
                border: '1px solid outline',
                // borderColor: 'text',
              }}
            >
              <Box pb={2}>
                <Label variant="settingslabel">{stripeAccount ? 'Payments enabled' : '💸 Add payments'}</Label>
                {!stripeAccount && (
                  <Box pt={2}>
                    <Text variant="small">Flexjar makes it easy to collect tips on your page.</Text>
                    <Text variant="small">Connect a Stripe account to get started. </Text>
                    <Box pt={3}>
                      <Button
                        variant="tiny"
                        mr={2}
                        onClick={() => {
                          window.location.assign(connectUrl);
                        }}
                      >
                        Connect Stripe
                      </Button>{' '}
                    </Box>
                  </Box>
                )}
                {stripeAccount && (
                  <Box>
                    <Text variant="small">Flexjar is connected to your Stripe account:</Text>
                    <pre>{JSON.stringify(stripeAccount, null, 2)}</pre>
                    <Button
                      variant="tiny"
                      mr={2}
                      onClick={() => {
                        disconnectStripe();
                      }}
                    >
                      Disconnect Stripe
                    </Button>{' '}
                    {errorMessage && <Text variant="small">{errorMessage}</Text>}
                  </Box>
                )}
              </Box>

              <Flex sx={{ bg: 'transparent', borderRadius: 4, pt: 4, flexDirection: 'row-reverse' }}>
                <Button onClick={() => signOut()} variant="tiny" sx={{ color: 'outline', cursor: 'pointer' }}>
                  <SignOutButtonIcon />
                </Button>
              </Flex>
            </Card>
          )}
          <Box my={4} />
        </>
      )}
      <PageFooter />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;
  const username = unprefixUsername(query.username as string);
  const session = await getSession(ctx);
  let error = null;
  let customer = null;
  let signedIn = false; // signed in as this user
  let sessionUsername = null;
  // signedIn: check session against url
  if (session && session.user.username) {
    sessionUsername = session.user.username;
    signedIn = sessionUsername === username;
  }
  let response = null;
  if (signedIn) {
    response = await getOrCreateCustomer(session, signedIn);
  } else {
    response = await getCustomer(username);
  }
  if (response.errored) {
    return {
      props: {
        error: response.data,
      },
    };
  }
  customer = response.data;
  let metadata = null;
  let customerId = null;
  if (customer) {
    metadata = customer.metadata || null;
    customerId = customer.id || null;
  }
  return {
    props: {
      username: username,
      name: metadata.name,
      profileImage: metadata.profile_image,
      metadata: metadata,
      customerId: customerId,
      signedIn: signedIn,
      error: error,
    },
  };
};

export default UserPage;
