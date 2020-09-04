import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextWidget from '../components/TextWidget';
import LinkWidget from '../components/LinkWidget';
import Settings from '../components/Settings';
import PageFooter from '../components/PageFooter';
import { getOrCreateCustomer, getCustomer } from '../lib/ops';
import { reorder, remove, add, unprefixUsername, generateWidgetId } from '../lib/utils';
import { postMetadataUpdate, readWidgetOrder } from '../lib/metadataUtils';
import { Direction, WidgetType } from '../lib/typedefs';
import { useRouter } from 'next/router';
import { Box, IconButton, Flex, Label, Text } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/client';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditButtonIcon from '../components/EditButtonIcon';
import ViewButtonIcon from '../components/ViewButtonIcon';
import AddButtonIcon from '../components/NewButtonIcon';
import BackButtonIcon from '../components/BackButtonIcon';
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

  // widget ordering, [{i: "w.text.A1B2"}, ...]
  const initialOrder = readWidgetOrder(props.metadata) || [];
  const [order, setOrder] = useState(initialOrder);
  const [showingNewMenu, setShowingNewMenu] = useState(false);
  const [previewing, setPreviewing] = useState(DEBUG ? false : true);
  const [metadata, setMetadata] = useState(props.metadata);

  const syncOrder = async function (newOrder: Record<string, string>[], removedId: string | null = null) {
    try {
      await postMetadataUpdate('w.order', newOrder, props.customerId, props.username, removedId);
      // don't need to call setMetadata if updating order only
    } catch (e) {
      console.error(e);
    }
  };

  const syncNewWidget = async function (id: string, value: string, order: Record<string, string>[]) {
    try {
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

  const moveWidget = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(order, index, newIndex);
    setOrder(newItems);
    syncOrder(newItems);
  };

  const removeWidget = (index: number) => {
    const result = remove(order, index);
    setOrder(result.items);
    syncOrder(result.items, result.removedId);
  };

  const addTextWidget = () => {
    const id = generateWidgetId(WidgetType.Text);
    const newItem = { i: id };
    // TODO #28: updating order without persisting TextWidget can result in stale order data
    const newItems = add(order, newItem);
    setOrder(newItems);
    syncNewWidget(id, defaultText, newItems);
  };

  const addLinkWidget = (content: any) => {
    const id = generateWidgetId(WidgetType.Link);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    const value = JSON.stringify({ text: content.text, url: content.url });
    setOrder(newItems);
    syncNewWidget(id, value, newItems);
    setShowingNewMenu(false);
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
                              {orderItem.i.startsWith('w.text.') && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <TextWidget
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
                                      moveWidget(index, Direction.Down);
                                    }}
                                    onUp={() => {
                                      moveWidget(index, Direction.Up);
                                    }}
                                    onDelete={() => {
                                      removeWidget(index);
                                    }}
                                  />
                                </Box>
                              )}
                              {orderItem.i.startsWith('w.link.') && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <LinkWidget
                                    id={orderItem.i}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    hideToolbar={previewing}
                                    metadata={metadata}
                                    username={props.username}
                                    customerId={props.customerId}
                                    signedIn={props.signedIn}
                                    onDown={() => {
                                      moveWidget(index, Direction.Down);
                                    }}
                                    onUp={() => {
                                      moveWidget(index, Direction.Up);
                                    }}
                                    onDelete={() => {
                                      removeWidget(index);
                                    }}
                                  />
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

          {showingNewMenu && (
            <NewMenu
              onClick={(result) => {
                switch (result.type as WidgetType) {
                  case WidgetType.Text:
                    addTextWidget();
                    break;
                  case WidgetType.Link:
                    addLinkWidget(result);
                    break;
                }
              }}
            />
          )}

          {props.signedIn && (
            <Flex sx={{ py: 3, mx: 1, justifyContent: 'space-between' }}>
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
            <Settings username={props.username} metadata={metadata} customerId={props.customerId} />
          )}
          <Box py={4} my={4} />
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
