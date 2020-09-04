import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextWidget from '../components/TextWidget';
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

const UserPage = (props) => {
  const {
    query: {},
  } = useRouter();

  // widget ordering, [{i: "w.text.A1B2"}, ...]
  let remoteOrder = readWidgetOrder(props.metadata);
  const defaultOrder = [];
  const initialOrder = remoteOrder || defaultOrder;
  const [order, setOrder] = useState(initialOrder);

  const [previewing, setPreviewing] = useState(true);

  const updateOrder = async function (newOrder: Record<string, string>[], removedId: string | null = null) {
    try {
      const metadata = {};
      metadata['w.order'] = JSON.stringify(newOrder);
      if (removedId) {
        metadata[removedId] = null;
      }
      await postMetadataUpdate('w.order', newOrder, props.customerId, props.username, removedId);
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
    updateOrder(newItems);
  };

  const moveWidget = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(order, index, newIndex);
    setOrder(newItems);
    updateOrder(newItems);
  };

  const removeWidget = (index: number) => {
    const result = remove(order, index);
    console.log('result', JSON.stringify(result, null, 2));
    setOrder(result.items);
    updateOrder(result.items, result.removedId);
  };

  const addWidget = () => {
    // TODO: add a widget type picker (Text or Link)
    const newId = generateWidgetId(WidgetType.Text);
    const newObject = { i: newId };
    const newItems = add(order, newObject);
    setOrder(newItems);
    updateOrder(newItems);
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
                          isDragDisabled={!props.signedIn}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{ outline: 'none !important' }}
                            >
                              {orderItem.i.startsWith('w.text.') && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <TextWidget
                                    id={orderItem.i}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    hideToolbar={previewing}
                                    metadata={props.metadata}
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
                  sx={{ fontSize: '24px' }}
                  onClick={() => {
                    if (!previewing) {
                      addWidget();
                    }
                  }}
                >
                  {previewing ? '' : <AddButtonIcon />}
                </IconButton>
              </Box>
            </Flex>
          )}
          {props.signedIn && !previewing && (
            <Settings username={props.username} metadata={props.metadata} customerId={props.customerId} />
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
