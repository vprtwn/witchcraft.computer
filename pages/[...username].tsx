import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextBlock from '../components/TextBlock';
import TitleBlock from '../components/TitleBlock';
import LinkBlock from '../components/LinkBlock';
import PageBlock from '../components/PageBlock';
import PaymentBlock from '../components/PaymentBlock';
import PageFooter from '../components/PageFooter';
import { useDebounce } from 'use-debounce';
import { reorder, remove, add, generateBlockId, generatePageId, generatePageBlockId, parseBlockId } from '../lib/utils';
import { transformPageData, updatePage } from '../lib/updatePage';
import { getPageProps } from '../lib/getPageProps';
import { Direction, BlockType } from '../lib/typedefs';
import { Box, Checkbox, Link, Badge, Input, IconButton, Flex, Card, Button, Text, Label, Textarea } from 'theme-ui';
import NumberFormat from 'react-number-format';
import { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';
import fetchJson from '../lib/fetchJson';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditButtonIcon from '../components/EditButtonIcon';
import ViewButtonIcon from '../components/ViewButtonIcon';
import SignOutButtonIcon from '../components/SignOutButtonIcon';
import NewMenu from '../components/NewMenu';
import { useSession } from 'next-auth/client';

const DEBOUNCE_MS = 700;

let DEBUG = true;
if (process.env.NODE_ENV === 'production') {
  DEBUG = false;
}

const UserPage = (props) => {
  const defaultText = 'edit me';

  const disconnectStripe = async function () {
    try {
      await fetchJson('/api/disconnect_stripe', {
        method: 'POST',
      });
      setStripeAccount(null);
    } catch (e) {
      console.error(e);
    }
  };

  const bootstrap = async () => {
    try {
      let url = `/api/bootstrap/${props.username}`;
      if (props.pageId) {
        url = url + `/${props.pageId}`;
      }
      const response = await fetchJson(url, {
        method: 'GET',
      });
      console.log('api/bootstrap', response);
      setStripeAccount(response.stripeAccount);
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
      console.log('api/initialize', response);
      setData(response);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  // block ordering, [{i: "b.text.A1B2"}, ...]
  // TODO: refactor/move payment settings storage to Stripe metadata
  const paymentSettings = props.data ? props.data['payment_settings'] : null;
  const [tipsEnabled, setTipsEnabled] = useState(paymentSettings ? paymentSettings.enabled : false);
  const [tipText, setTipText] = useState(paymentSettings ? paymentSettings.text : 'Leave a tip');
  const [debouncedTipText] = useDebounce(tipText, DEBOUNCE_MS);
  const [defaultTipAmount, setDefaultTipAmount] = useState(paymentSettings ? paymentSettings.defaultAmount : 500);
  const [debouncedTipAmount] = useDebounce(defaultTipAmount, DEBOUNCE_MS);
  const [hideTipsFeed, setHideTipsFeed] = useState(paymentSettings ? paymentSettings.hideFeed : false);
  const initialOrder = props.data ? props.data['b.order'] : [];
  const [order, setOrder] = useState(initialOrder);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [parentUploadUrl, setParentUploadUrl] = useState<string | null>(null);

  const [previewing, setPreviewing] = useState(true);
  const [data, setData] = useState(props.data);
  const [stripeAccount, setStripeAccount] = useState<object | null>(null);

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    const newSettings = {
      text: tipText,
      defaultAmount: defaultTipAmount,
      enabled: tipsEnabled,
      hideFeed: hideTipsFeed,
    };
    syncPaymentSettings(newSettings);
  }, [debouncedTipText, tipsEnabled, debouncedTipAmount, hideTipsFeed]);

  const syncNewBlock = async function (id: string, value: string | object, order: Record<string, string>[]) {
    if (!uploadUrl || !signedIn) {
      console.error("couldn't sync update");
      return;
    }
    try {
      const pageData = transformPageData(data, id, value, null, order);
      setData(pageData);
      await updatePage(uploadUrl, pageData);
    } catch (e) {
      console.error(e);
    }
  };

  // TODO: sync payment settings to stripe customer
  const syncPaymentSettings = async function (newSettings: object) {
    try {
      // await updatePage(uploadUrl, data, 'payment_settings', newSettings);
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
      await updatePage(uploadUrl, data, 'b.order', newOrder, removedId);
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
            <TitleBlock
              pageId={props.pageId}
              uploadUrl={uploadUrl}
              parentUploadUrl={parentUploadUrl}
              data={data}
              parentData={props.parentData}
              previewing={previewing}
              signedIn={props.signedIn}
            />
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

          {props.signedIn && (
            <Flex
              sx={{ pt: 4, mx: 2, justifyContent: 'space-between' }}
              onClick={() => {
                setPreviewing(!previewing);
              }}
            >
              <Box></Box>
              <Box>
                <IconButton
                  variant={!previewing ? 'iconselected' : 'icon'}
                  onClick={() => {
                    setPreviewing(!previewing);
                  }}
                >
                  {previewing ? <EditButtonIcon /> : <ViewButtonIcon />}
                </IconButton>
              </Box>
              <Box></Box>
            </Flex>
          )}

          {/* hiding tip jar for now – payments will be nice, but the core has to be great first. */}
          {false && stripeAccount && tipsEnabled && (
            <>
              <PaymentBlock
                signedIn={signedIn}
                stripeAccount={stripeAccount}
                text={tipText}
                defaultAmount={defaultTipAmount}
                hideTipsFeed={hideTipsFeed}
              />
            </>
          )}
        </>
      )}
      <PageFooter />
      {props.signedIn && (
        <Card variant="block" sx={{ p: 3, mb: 4, bg: 'transparent', border: '1px dotted lightGray' }}>
          {false && !props.pageId && (
            <Box sx={{ mb: 3 }}>
              <Flex sx={{ alignItems: 'center' }}>
                <Flex>
                  <Label sx={{ bg: 'lightBlue', p: 1, borderRadius: '8px 8px 0px 0px' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                      <Text variant="small">{stripeAccount ? 'Connected to Stripe' : 'Connect Stripe account'}</Text>
                    </Flex>
                  </Label>
                </Flex>
              </Flex>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: `1px dashed lightBlue`,
                  bg: 'offWhite',
                }}
              >
                <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  {stripeAccount && (
                    <Text variant="tiny" sx={{ fontFamily: 'mono' }}>
                      {stripeAccount['id']}
                    </Text>
                  )}
                  {stripeAccount && session && ['bgdotjpg'].includes(session.user.username) && (
                    <Button
                      variant="tiny"
                      sx={{ fontSize: 11 }}
                      onClick={() => {
                        disconnectStripe();
                      }}
                    >
                      Disconnect Stripe
                    </Button>
                  )}
                </Flex>
                {!stripeAccount && (
                  <Text variant="small" sx={{ fontFamily: 'mono' }}>
                    Monetize your <Badge variant="outline">tray</Badge> by collecting tips.
                  </Text>
                )}
                {(!stripeAccount || (stripeAccount && !stripeAccount['charges_enabled'])) && (
                  <Box pt={2}>
                    <Button
                      variant="shadowButton"
                      mr={2}
                      onClick={async () => {
                        try {
                          const response = await fetchJson('/api/connect_stripe', {
                            method: 'POST',
                          });
                          const url = response.url;
                          window.location.assign(url);
                        } catch (e) {
                          // TODO: handle error
                        }
                      }}
                    >
                      {stripeAccount && !stripeAccount['charges_enabled'] ? 'Complete onboarding' : 'Get started'}
                    </Button>{' '}
                  </Box>
                )}
                {!stripeAccount && (
                  <Text variant="tiny" sx={{ fontFamily: 'mono', pt: 2, color: 'gray' }}>
                    ^ You'll be redirected to create an account with Stripe, our payments provider. Stripe collects a{' '}
                    <Link variant="primary" href="https://stripe.com/pricing#pricing-details">
                      fee
                    </Link>{' '}
                    on payments.
                  </Text>
                )}
                {stripeAccount && !stripeAccount['charges_enabled'] && (
                  <Text variant="tiny" sx={{ fontFamily: 'mono', pt: 2, color: 'gray' }}>
                    ^ Payments are not yet enabled on your Stripe account. You'll be redirected to Stripe to continue
                    setting up your account.
                  </Text>
                )}
              </Box>
              {stripeAccount && (
                <Box>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Flex>
                      <Label
                        sx={{ bg: tipsEnabled ? 'lightGreen' : 'offWhite', p: 1, borderRadius: '8px 8px 0px 0px' }}
                      >
                        <Flex sx={{ alignItems: 'center' }}>
                          <Checkbox defaultChecked={tipsEnabled} onChange={(e) => setTipsEnabled(e.target.checked)} />
                          <Text variant="small">Enable tips</Text>
                        </Flex>
                      </Label>
                    </Flex>
                  </Flex>
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      mb: 2,
                      borderRadius: 4,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: `1px ${tipsEnabled ? 'dashed' : 'none'} lightGreen`,
                      bg: 'offWhite',
                    }}
                  >
                    <Box sx={{ alignItems: 'center', mb: 2 }}>
                      <Label sx={{ mb: 2 }}>Button text</Label>
                      <Input
                        disabled={!tipsEnabled}
                        variant="standardInput"
                        sx={{ textAlign: 'center', bg: 'transparent', border: `1px dotted lightGray` }}
                        defaultValue={tipText}
                        onChange={(e) => setTipText(e.target.value)}
                      />
                    </Box>
                    <Box sx={{ alignItems: 'center', mb: 0 }}>
                      <Label sx={{ mb: -3 }}>Default amount</Label>
                      <NumberFormat
                        disabled={!tipsEnabled}
                        name="amount"
                        id="amount"
                        decimalScale={0}
                        allowEmptyFormatting={true}
                        allowNegative={false}
                        type="tel"
                        defaultValue={(defaultTipAmount as number) / 100.0}
                        displayType={'input'}
                        thousandSeparator={true}
                        prefix={'$'}
                        customInput={Input}
                        renderText={(value) => <Input value={value} />}
                        onValueChange={(values) => setDefaultTipAmount(~~(values.floatValue * 100))}
                      />
                    </Box>
                    {tipsEnabled && (
                      <Label>
                        <Flex sx={{ alignItems: 'center' }}>
                          <Checkbox
                            disabled={!tipsEnabled}
                            defaultChecked={hideTipsFeed}
                            onChange={(e) => setHideTipsFeed(e.target.checked)}
                          />
                          <Text variant="tiny">Hide feed</Text>
                        </Flex>
                      </Label>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          <Flex sx={{ bg: 'transparent', flexDirection: 'row-reverse' }}>
            <Button onClick={() => signOut()} variant="tiny" sx={{ border: 'dotted 1px lightGray', cursor: 'pointer' }}>
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
