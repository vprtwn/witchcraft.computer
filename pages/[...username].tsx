import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextBlock from '../components/TextBlock';
import TitleBlock from '../components/TitleBlock';
import LinkBlock from '../components/LinkBlock';
import PageBlock from '../components/PageBlock';
import PageFooter from '../components/PageFooter';
import { reorder, remove, add, generateBlockId, generatePageId, generatePageBlockId, parseBlockId } from '../lib/utils';
import { transformPageData, updatePage } from '../lib/updatePage';
import { getPageProps } from '../lib/getPageProps';
import { Direction, BlockType } from '../lib/typedefs';
import { Box, Alert, IconButton, Flex, Card, Button, Textarea } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';
import fetchJson from '../lib/fetchJson';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditButtonIcon from '../components/EditButtonIcon';
import CloseButtonIcon from '../components/CloseButtonIcon';
import SignOutButtonIcon from '../components/SignOutButtonIcon';
import NewMenu from '../components/NewMenu';
import { useSession } from 'next-auth/client';

let DEBUG = true;
if (process.env.NODE_ENV === 'production') {
  DEBUG = false;
}

const UserPage = (props) => {
  const defaultText = 'edit me';

  const bootstrap = async () => {
    try {
      let url = `/api/bootstrap/${props.username}`;
      if (props.pageId) {
        url = url + `/${props.pageId}`;
      }
      const response = await fetchJson(url, {
        method: 'GET',
      });
      if (response.error) {
        setAlert(response.error);
      }
      setUploadUrl(response.uploadUrl);
      setParentUploadUrl(response.parentUploadUrl);
      await initialize(response.uploadUrl);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const initialize = async (uploadUrl: string) => {
    if (!uploadUrl) {
      console.error("couldn't initialize page, no upload url");
      return;
    }
    try {
      const body = {
        uploadUrl: uploadUrl,
        data: props.data,
        pageId: props.pageId,
      };
      console.log('initialize', body);
      const response = await fetchJson('/api/initialize', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      setData(response);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  // block ordering, [{i: "b.text.A1B2"}, ...]
  const initialOrder = props.data ? props.data['b.order'] : [];
  const [order, setOrder] = useState(initialOrder);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [parentUploadUrl, setParentUploadUrl] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const [previewing, setPreviewing] = useState(true);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    bootstrap();
  }, []);

  const syncNewBlock = async function (id: string, value: string | object, order: Record<string, string>[]) {
    if (!uploadUrl || !signedIn) {
      console.error("couldn't sync update");
      return;
    }
    try {
      const pageData = transformPageData(data, id, value, null, order);
      setData(pageData);
      const response = await updatePage(uploadUrl, pageData);
      if (response['error']) {
        setAlert(response['error']);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const syncOrder = async function (
    uploadUrl: string,
    data: object,
    newOrder: Record<string, string>[],
    removedId: string | null = null,
  ) {
    if (!uploadUrl || !signedIn) {
      console.error("couldn't sync update");
      return;
    }
    try {
      const pageData = transformPageData(data, 'b.order', newOrder, removedId);
      const response = await updatePage(uploadUrl, pageData);
      if (response['error']) {
        setAlert(response['error']);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (!uploadUrl) {
      console.error("couldn't sync update, no upload url");
      return;
    }
    const newItems = reorder(order, result.source.index, result.destination.index);
    setOrder(newItems);
    syncOrder(uploadUrl, data, newItems);
  };

  const moveBlock = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    if (!uploadUrl) {
      console.error("couldn't sync update, no upload url");
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(order, index, newIndex);
    setOrder(newItems);
    syncOrder(uploadUrl, data, newItems);
  };

  const removeBlock = (index: number) => {
    if (!uploadUrl) {
      console.error("couldn't sync update, no upload url");
      return;
    }
    const result = remove(order, index);
    setOrder(result.items);
    syncOrder(uploadUrl, data, result.items, result.removedId);
  };

  const addLinkBlock = async (content: any) => {
    const id = generateBlockId(BlockType.Link);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    const value = { text: content.text, url: content.url, comment: content.comment };
    setOrder(newItems);
    await syncNewBlock(id, value, newItems);
  };

  const addTextBlock = async () => {
    const id = generateBlockId(BlockType.Text);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    setOrder(newItems);
    await syncNewBlock(id, defaultText, newItems);
  };

  const addPageBlock = async () => {
    const pageId = generatePageId();
    const blockId = generatePageBlockId(pageId);
    const newItem = { i: blockId };
    const newItems = add(order, newItem);
    const value = { id: pageId, title: 'New page' };
    setOrder(newItems);
    await syncNewBlock(blockId, value, newItems);
  };

  return (
    <Layout>
      {/* {DEBUG && !props.error && (
        <Textarea rows={10} sx={{ borderColor: 'blue', my: 4 }} defaultValue={JSON.stringify(props, null, 2)} />
      )} */}
      {props.error && (
        <Textarea rows={10} sx={{ borderColor: 'red', my: 4 }} defaultValue={JSON.stringify(props.error, null, 2)} />
      )}
      {!props.error && (
        <>
          <Header name={data ? data.name : ''} username={props.username} pageId={props.pageId} />
          {props.pageId && (
            <Box
              onClick={() => {
                if (previewing) {
                  setPreviewing(false);
                }
              }}
            >
              <TitleBlock
                pageId={props.pageId}
                uploadUrl={uploadUrl}
                parentUploadUrl={parentUploadUrl}
                data={data}
                parentData={props.parentData}
                previewing={previewing}
                signedIn={props.signedIn}
              />
            </Box>
          )}
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
                                    id={orderItem.i}
                                    uploadUrl={uploadUrl}
                                    data={data}
                                    default={defaultText}
                                    previewing={previewing}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
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
                                    uploadUrl={uploadUrl}
                                    data={data}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    previewing={previewing}
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
                              {parseBlockId(orderItem.i) === BlockType.Page && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <PageBlock
                                    username={props.username}
                                    uploadUrl={uploadUrl}
                                    data={data}
                                    id={orderItem.i}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    previewing={previewing}
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

          {!previewing && (
            <NewMenu
              pageId={props.pageId}
              onClick={(result) => {
                console.log(result);
                switch (result.type as BlockType) {
                  case BlockType.Text:
                    addTextBlock();
                    break;
                  case BlockType.Link:
                    addLinkBlock(result);
                    break;
                  case BlockType.Page:
                    addPageBlock();
                    break;
                }
              }}
            />
          )}

          {alert && <Alert variant="alert_error">{alert}</Alert>}

          {props.signedIn && (
            <Flex sx={{ mx: 2, justifyContent: 'space-between' }}>
              <Box></Box>
              <Box
                sx={{ p: 4 }}
                onClick={() => {
                  setPreviewing(!previewing);
                }}
              >
                <IconButton
                  variant={!previewing ? 'iconselected' : 'icon'}
                  onClick={() => {
                    setPreviewing(!previewing);
                  }}
                >
                  {previewing ? <EditButtonIcon /> : <CloseButtonIcon />}
                </IconButton>
              </Box>
              <Box></Box>
            </Flex>
          )}
        </>
      )}
      <PageFooter />
      {props.signedIn && (
        <Card variant="card_dotted_gray">
          <Flex sx={{ bg: 'transparent', flexDirection: 'row-reverse' }}>
            <Button
              variant="button_small"
              onClick={() => signOut()}
              sx={{ border: 'dotted 1px lightGray', cursor: 'pointer' }}
            >
              <SignOutButtonIcon />
            </Button>
          </Flex>
        </Card>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const query = ctx.query;

  const result = await getPageProps(session, query);
  return result;
};
export default UserPage;
