import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextBlock from '../components/TextBlock';
import LinkBlock from '../components/LinkBlock';
import PageBlock from '../components/PageBlock';
import PaymentBlock from '../components/PaymentBlock';
import PageFooter from '../components/PageFooter';
import { getOrCreateCustomer } from '../lib/ops';
import { reorder, remove, add, unprefixUsername, generateBlockId, generatePageId, parseBlockId } from '../lib/utils';
import { updatePage } from '../lib/updatePage';
import { Direction, BlockType } from '../lib/typedefs';
import { useRouter } from 'next/router';
import { Box, Checkbox, Link, Badge, Input, IconButton, Flex, Card, Button, Text, Label, Textarea } from 'theme-ui';
import NumberFormat from 'react-number-format';
import { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';
import fetchJson from '../lib/fetchJson';
import { syncPaymentSettings, syncOrder } from '../lib/pageHelpers';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditButtonIcon from '../components/EditButtonIcon';
import ViewButtonIcon from '../components/ViewButtonIcon';
import AddButtonIcon from '../components/NewButtonIcon';
import BackButtonIcon from '../components/BackButtonIcon';
import SignOutButtonIcon from '../components/SignOutButtonIcon';
import NewMenu from '../components/NewMenu';
import { useSession } from 'next-auth/client';

let DEBUG = true;
if (process.env.NODE_ENV === 'production') {
  DEBUG = false;
}

const UserPage = (props) => {
  const {
    query: { username },
  } = useRouter();

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

  const fetchStripeConnected = async () => {
    try {
      const response = await fetchJson('/api/stripe_connected', {
        method: 'GET',
      });
      if (response.account) {
        setStripeAccount(response.account);
      }
    } catch (e) {
      console.error(e);
      return;
    }
  };

  useEffect(() => {
    fetchStripeConnected();
  }, []);

  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  // block ordering, [{i: "b.text.A1B2"}, ...]
  const paymentSettings = props.data ? props.data['payment_settings'] : null;
  const [tipsEnabled, setTipsEnabled] = useState(paymentSettings ? paymentSettings.enabled : false);
  const [tipText, setTipText] = useState(paymentSettings ? paymentSettings.text : 'Leave a tip');
  const [defaultTipAmount, setDefaultTipAmount] = useState(paymentSettings ? paymentSettings.defaultAmount : 500);
  const [hideTipsFeed, setHideTipsFeed] = useState(paymentSettings ? paymentSettings.hideFeed : false);
  const initialOrder = props.data ? props.data['b.order'] : [];
  const [order, setOrder] = useState(initialOrder);
  const [showingNewMenu, setShowingNewMenu] = useState(false);
  const [previewing, setPreviewing] = useState(DEBUG ? false : true);
  const [data, setData] = useState(props.data);
  const [stripeAccount, setStripeAccount] = useState<object | null>(null);

  useEffect(() => {
    const newSettings = {
      text: tipText,
      defaultAmount: defaultTipAmount,
      enabled: tipsEnabled,
      hideFeed: hideTipsFeed,
    };
    syncPaymentSettings(props.uploadUrl, data, newSettings);
  }, [tipText, tipsEnabled, defaultTipAmount, hideTipsFeed]);

  const syncNewBlock = async function (id: string, value: string | object, order: Record<string, string>[]) {
    try {
      setShowingNewMenu(false);
      const newData = await updatePage(props.uploadUrl, data, id, value, null, order);
      setData(newData);
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
    syncOrder(props.uploadUrl, data, newItems);
  };

  const moveBlock = (index: number, direction: Direction) => {
    if (index === 0 && direction === Direction.Up) {
      return;
    }
    const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    const newItems = reorder(order, index, newIndex);
    setOrder(newItems);
    syncOrder(props.uploadUrl, data, newItems);
  };

  const removeBlock = (index: number) => {
    const result = remove(order, index);
    setOrder(result.items);
    syncOrder(props.uploadUrl, data, result.items, result.removedId);
  };

  const addLinkBlock = async (content: any) => {
    const id = generateBlockId(BlockType.Link);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    const value = { text: content.text, url: content.url, comment: content.comment };
    await syncNewBlock(id, value, newItems);
    setOrder(newItems);
  };

  const addTextBlock = async () => {
    const id = generateBlockId(BlockType.Text);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    await syncNewBlock(id, defaultText, newItems);
    setOrder(newItems);
  };

  const addPageBlock = async () => {
    console.log('addPageBlock');
    const blockId = generateBlockId(BlockType.Page);
    const pageId = generatePageId();
    const newItem = { i: blockId };
    const newItems = add(order, newItem);
    const value = { id: pageId };
    await syncNewBlock(blockId, value, newItems);
    setOrder(newItems);
  };

  return (
    <Layout>
      {/* {DEBUG && (
        <Textarea rows={10} sx={{ borderColor: 'blue', my: 4 }}>
          {JSON.stringify(props, null, 2)}
        </Textarea>
      )} */}
      {props.error && (
        <Textarea rows={10} sx={{ borderColor: 'red', my: 4 }}>
          {JSON.stringify(props.error, null, 2)}
        </Textarea>
      )}
      {!props.error && (
        <>
          <Header name={props.data ? props.data.name : ''} username={username} />
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
                                    uploadUrl={props.uploadUrl}
                                    data={data}
                                    default={defaultText}
                                    previewing={previewing}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    hideToolbar={previewing}
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
                                    uploadUrl={props.uploadUrl}
                                    data={data}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    hideToolbar={previewing}
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
                                    username={username}
                                    uploadUrl={props.uploadUrl}
                                    data={data}
                                    id={orderItem.i}
                                    hideUp={index === 0}
                                    hideDown={index === order.length - 1}
                                    hideToolbar={previewing}
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

          {showingNewMenu && !previewing && (
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
            <Flex sx={{ pt: 4, mx: 2, justifyContent: 'space-between' }}>
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
              <Box>
                <IconButton
                  variant={!previewing && !showingNewMenu ? 'iconselected' : 'icon'}
                  onClick={() => {
                    setPreviewing(!previewing);
                  }}
                >
                  {previewing ? <EditButtonIcon /> : <ViewButtonIcon />}
                </IconButton>
              </Box>
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
        <Card variant="block" sx={{ p: 3, mb: 4, border: '1px dotted lightGray' }}>
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
            <Button
              onClick={() => signOut()}
              variant="tiny"
              sx={{ border: 'dotted 1px', color: 'lightGray', cursor: 'pointer' }}
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
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const config = { accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET };
  AWS.config.update(config);

  const session = await getSession(ctx);
  let pageId = null;
  let error = null;
  let data = null;
  let signedIn = false; // signed in as this user
  let uploadUrl = null;
  let sessionUsername = null;

  const query = ctx.query;
  console.log(JSON.stringify(query, null, 2));
  const params = query['username'];
  let username = params[0] as string;
  username = unprefixUsername(username);
  if (params.length > 2) {
    return {
      props: {
        error: { message: 'invalid URL' },
      },
    };
  }

  if (params.length > 1) {
    pageId = params[1];
  }
  let objectKey = `@${username}`;
  if (pageId) {
    objectKey = `@${username}/${pageId}`;
  }

  try {
    const s3data = await s3
      .getObject({
        Bucket: 'traypages',
        Key: objectKey,
      })
      .promise();
    const object = s3data.Body.toString('utf-8');
    data = JSON.parse(object);
  } catch (e) {
    console.error(`no object at ${objectKey}`, e.message);
  }

  if (session && session.user.username) {
    sessionUsername = session.user.username;
    signedIn = sessionUsername === username;
  }

  if (signedIn) {
    // get a Stripe Customer or create one
    const customerResponse = await getOrCreateCustomer(session, signedIn);
    if (customerResponse.errored) {
      return {
        props: {
          error: customerResponse.data,
        },
      };
    }

    // create a signed S3 URL for page data updates
    try {
      uploadUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'traypages',
        Key: objectKey,
        ContentType: 'application/json',
      });
    } catch (e) {
      return {
        props: {
          error: e,
        },
      };
    }
    // if this is a new user, populate initial page data
    if (customerResponse.createdCustomer || !data) {
      try {
        let initialData = {};
        if (pageId) {
          initialData = {
            title: 'New page',
          };
        } else {
          initialData = {
            email: session.user.email,
            name: session.user.name,
            profile_image: session.user.picture,
            twitter_id: session.user.id,
            twitter_username: session.user.username,
            twitter_description: session.user.description,
            payment_settings: {
              text: 'Leave a tip',
              defaultAmount: 500,
              enabled: false,
              hideFeed: false,
            },
          };
        }
        await fetch(uploadUrl, {
          method: 'PUT',
          body: JSON.stringify(initialData, null, 2),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        data = initialData;
      } catch (e) {
        return { props: { error: { message: e.message } } };
      }
    }
  }

  return {
    props: {
      uploadUrl: uploadUrl,
      data: data,
      pageId: pageId,
      signedIn: signedIn,
      error: error,
    },
  };
};
export default UserPage;
