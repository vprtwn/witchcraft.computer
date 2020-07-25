import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Widget from "../components/Widget";
import fetchJson from "../lib/fetchJson";
import { useRouter } from "next/router";
import { Box, IconButton, Flex, Card, Label, Radio, Select, useColorMode } from "theme-ui";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

enum Direction {
  Up,
  Down,
}

const reorder = (list, startIndex, endIndex): { i: number }[] => {
  const result = Array.from(list) as { i: number }[];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const remove = (list, index): { i: number }[] => {
  const result = Array.from(list) as { i: number }[];
  const [removed] = result.splice(index, 1);
  return result;
};

const add = (list, newObject): { i: number }[] => {
  const result = Array.from(list) as { i: number }[];
  result.push(newObject);
  return result;
};

const IndexPage = (props) => {
  const {
    query: { username },
  } = useRouter();

  let remoteOrder = null;
  const defaultStyle = { colorMode: "light" };
  let remoteStyle = defaultStyle;
  if (props.metadata) {
    if (props.metadata["order"]) {
      remoteOrder = JSON.parse(props.metadata["order"]);
    }
    if (props.metadata["style"]) {
      remoteStyle = JSON.parse(props.metadata["style"]);
    }
  }
  // order of items
  const initialId = Math.floor(Math.random() * 10000);
  const defaultOrder = [{ i: initialId }];
  const initialOrder = remoteOrder || defaultOrder;
  const [items, setItems] = useState(initialOrder);
  // style of items
  const [style, setStyle] = useState(remoteStyle);

  const [previewing, setPreviewing] = useState(false);
  const [styling, setStyling] = useState(false);
  const [colorMode, setColorMode] = useColorMode();

  const updateOrder = async function (newOrder: { i: number }[], removed: number | null = null) {
    try {
      const metadata = {};
      metadata["order"] = JSON.stringify(newOrder);
      if (removed) {
        metadata[removed.toString()] = null;
      }
      const params = {
        username: username,
        metadata: metadata,
        customerId: props.customerId,
      };
      console.log("params", JSON.stringify(params, null, 2));
      await fetchJson(`/api/update_metadata`, {
        method: "POST",
        body: JSON.stringify(params),
      });
      console.log("updated metadata", JSON.stringify(metadata));
    } catch (e) {
      console.error(e);
    }
  };

  const updateStyle = async function (style) {
    try {
      const metadata = {};
      metadata["style"] = JSON.stringify(style);
      const params = {
        username: username,
        metadata: metadata,
        customerId: props.customerId,
      };
      console.log("params", JSON.stringify(params, null, 2));
      const result = await fetchJson(`/api/update_metadata`, {
        method: "POST",
        body: JSON.stringify(params),
      });
      console.log("updated metadata", JSON.stringify(result));
    } catch (e) {
      console.error(e);
    }
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newItems = reorder(items, result.source.index, result.destination.index);
    setItems(newItems);
    updateOrder(newItems);
  };

  const moveItem = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(items, index, newIndex);
    setItems(newItems);
    updateOrder(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = remove(items, index);
    setItems(newItems);
    updateOrder(newItems, index);
  };

  const addItem = () => {
    const newI = Math.floor(Math.random() * 10000);
    const newObject = { i: newI };
    const newItems = add(items, newObject);
    setItems(newItems);
    updateOrder(newItems);
  };

  return (
    <Layout>
      <Header username={username} />
      <Box py={2} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" isDragDisabled={props.signedIn}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.i.toString()} draggableId={item.i.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Widget
                        hideUp={index === 0}
                        hideDown={index === items.length - 1}
                        hideToolbar={previewing}
                        metadata={props.metadata}
                        index={item.i}
                        username={username}
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
          <Box>
            <IconButton
              sx={{ fontSize: "24px" }}
              onClick={() => {
                setPreviewing(!previewing);
              }}
            >
              {previewing ? "✏️" : "👁"}
            </IconButton>
          </Box>
          <Box>
            <IconButton
              sx={{ fontSize: "24px" }}
              onClick={() => {
                setStyling(!styling);
              }}
            >
              {styling ? "🖌" : "🎨"}
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
              {previewing ? "" : "🆕"}
            </IconButton>
          </Box>
        </Flex>
      )}
      {styling && (
        <Card
          sx={{
            p: 3,
            my: 2,
            border: "1px solid",
            borderColor: "primary",
          }}
        >
          <Select
            defaultValue={style.colorMode}
            onChange={(e) => {
              const newMode = e.target.value;
              const newStyle = { colorMode: newMode };
              setStyle(newStyle);
              updateStyle(newStyle);
              setColorMode(newMode);
            }}
          >
            <option>light</option>
            <option>darkNectarine</option>
          </Select>
        </Card>
      )}
      <Box py={4} my={4} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;
  const username = query.username as string;
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
  // get customer metadata
  const email = `${username}@0l0.at`;
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const response = await stripe.customers.list({ email: email });
    if (response.data.length > 0) {
      customer = response.data[0];
      console.log("retrieved existing customer");
    }
    if (!customer && signedIn) {
      customer = await stripe.customers.create({
        email: email,
      });
      console.log("created customer");
    }
  } catch (e) {
    error = e.message;
    console.error("error fetching customer: " + e);
  }
  return {
    props: {
      metadata: customer ? customer.metadata : null,
      customerId: customer ? customer.id : null,
      signedIn: signedIn,
      error: error,
    },
  };
};

export default IndexPage;
