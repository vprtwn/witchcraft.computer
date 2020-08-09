import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Widget from "../components/Widget";
import Settings from "../components/Settings";
import { getOrCreateCustomer, getCustomer } from "../lib/ops";
import { reorder, remove, add, unprefixUsername, generateCardId } from "../lib/utils";
import { postMetadataUpdate, readOrder } from "../lib/metadataUtils";
import { Direction } from "../lib/typedefs";
import { useRouter } from "next/router";
import { Box, IconButton, Flex, Label, Text } from "theme-ui";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const UserPage = (props) => {
  const {
    query: { v },
  } = useRouter();

  // order of items
  let remoteOrder = readOrder(props.metadata);
  const defaultOrder = [];
  const initialOrder = remoteOrder || defaultOrder;
  const [order, setOrder] = useState(initialOrder);

  const [previewing, setPreviewing] = useState(false);
  const [viewingSettings, setViewingSettings] = useState(v === "settings");

  const updateOrder = async function (
    newOrder: Record<string, string>[],
    removedId: string | null = null
  ) {
    try {
      const metadata = {};
      metadata["order"] = JSON.stringify(newOrder);
      if (removedId) {
        metadata[removedId] = null;
      }
      const newVal = await postMetadataUpdate(
        "order",
        newOrder,
        props.customerId,
        props.username,
        removedId
      );
      // setOrder(newVal);
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

  const moveItem = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(order, index, newIndex);
    setOrder(newItems);
    updateOrder(newItems);
  };

  const removeItem = (index: number) => {
    const result = remove(order, index);
    console.log("result", JSON.stringify(result, null, 2));
    setOrder(result.items);
    updateOrder(result.items, result.removedId);
  };

  const addItem = () => {
    const newId = generateCardId();
    const newObject = { i: newId };
    const newItems = add(order, newObject);
    setOrder(newItems);
    updateOrder(newItems);
  };

  return (
    <Layout>
      <Header username={props.username} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {order &&
                order.map((item, index) => (
                  <Draggable
                    key={item.i}
                    draggableId={item.i}
                    index={index}
                    isDragDisabled={!props.signedIn}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Widget
                          id={item.i}
                          hideUp={index === 0}
                          hideDown={index === order.length - 1}
                          hideToolbar={previewing}
                          metadata={props.metadata}
                          username={props.username}
                          customerId={props.customerId}
                          signedIn={props.signedIn}
                          onDown={() => {
                            moveItem(index, Direction.Down);
                          }}
                          onUp={() => {
                            moveItem(index, Direction.Up);
                          }}
                          onDelete={() => {
                            removeItem(index);
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {props.signedIn && (
        <Flex sx={{ py: 3, justifyContent: "space-between" }}>
          <Box sx={{}}>
            <IconButton
              sx={{
                // fontSize: "24px",
                // width: "21px",
                // height: "21px",
                visibility: order && order.length > 0 ? "visible" : "hidden",
              }}
              onClick={() => {
                setPreviewing(!previewing);
              }}
            >
              {previewing ? (
                <Box sx={{}}>
                  <svg
                    display="block"
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      stroke="#2a2e3b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      transform="translate(2 2)"
                    >
                      <path
                        d="m8.24920737-.79402796c1.17157287 0 2.12132033.94974747 2.12132033 2.12132034v13.43502882l-2.12132033 3.5355339-2.08147546-3.495689-.03442539-13.47488064c-.00298547-1.16857977.94191541-2.11832105 2.11049518-2.12130651.00180188-.00000461.00360378-.00000691.00540567-.00000691z"
                        transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.605553 -3.271644)"
                      />
                      <path d="m13.5 4.5 1 1" />
                    </g>
                  </svg>
                  <Label>Edit</Label>
                </Box>
              ) : (
                <Box sx={{}}>
                  <svg
                    display="block"
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      stroke="#2a2e3b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      transform="translate(3 3)"
                    >
                      <path d="m2 .5h11c1.1045695 0 2 .8954305 2 2v6.04882185c0 1.1045695-.8954305 1.99999995-2 1.99999995-.0025044 0-.0050088-.0000047-.0075132-.0000141l-10.99999997-.0413227c-1.10162878-.0041384-1.99248683-.89834933-1.99248683-1.99998589v-6.00749911c0-1.1045695.8954305-2 2-2z" />
                      <path d="m2.464 12.5h10.036" />
                      <path d="m4.5 14.5h6" />
                    </g>
                  </svg>
                  <Label>View</Label>
                </Box>
              )}
            </IconButton>
          </Box>
          <Box>
            <IconButton
              sx={{ fontSize: "24px" }}
              onClick={() => {
                setViewingSettings(!viewingSettings);
              }}
            >
              {viewingSettings ? (
                <Flex
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <svg
                      display="block"
                      height="21"
                      viewBox="0 0 21 21"
                      width="21"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#2a2e3b"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        transform="translate(3 3)"
                      >
                        <path d="m5.5.5v5h-5.5" transform="matrix(1 0 0 -1 0 15)" />
                        <path d="m5.5.5v5h-5.5" transform="matrix(-1 0 0 -1 15 15)" />
                        <path d="m5.5.5v5.5h-5" transform="matrix(0 1 1 0 -.5 0)" />
                        <path d="m5.5.5v5.5h-5" transform="matrix(0 1 -1 0 15.5 0)" />
                      </g>
                    </svg>
                  </Box>
                  <Box>
                    <Label>Settings</Label>
                  </Box>
                </Flex>
              ) : (
                <Flex
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <svg
                      display="block"
                      height="21"
                      viewBox="0 0 21 21"
                      width="21"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#2a2e3b"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        transform="translate(2 4)"
                      >
                        <path d="m.5 8.5 8 4 8.017-4" />
                        <path d="m.5 4.657 8.008 3.843 8.009-3.843-8.009-4.157z" />
                      </g>
                    </svg>
                  </Box>
                  <Box>
                    <Label>Settings</Label>
                  </Box>
                </Flex>
              )}
            </IconButton>
          </Box>
          <Box>
            <IconButton
              sx={{ fontSize: "24px" }}
              onClick={() => {
                if (!previewing) {
                  addItem();
                }
              }}
            >
              {previewing ? (
                ""
              ) : (
                <Box sx={{}}>
                  <svg
                    display="block"
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      stroke="#2a2e3b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      transform="translate(3 2)"
                    >
                      <path
                        d="m.5 9v3.5c0 1.1045695.8954305 2 2 2h7c1.1045695 0 2-.8954305 2-2v-7c0-1.1045695-.8954305-2-2-2h-3.5"
                        transform="matrix(0 1 -1 0 15 3)"
                      />
                      <path d="m11.5.5v6" />
                      <path d="m11.5.5v6" transform="matrix(0 1 -1 0 15 -8)" />
                    </g>
                  </svg>
                  <Label>Add</Label>
                </Box>
              )}
            </IconButton>
          </Box>
        </Flex>
      )}
      {viewingSettings && props.signedIn && (
        <Settings
          username={props.username}
          metadata={props.metadata}
          customerId={props.customerId}
        />
      )}
      <Box py={4} my={4} />
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
        username: username,
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
      metadata: metadata,
      customerId: customerId,
      signedIn: signedIn,
      error: error,
    },
  };
};

export default UserPage;
