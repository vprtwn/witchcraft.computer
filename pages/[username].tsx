import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import TextBlock from '../components/TextBlock';
import LinkBlock from '../components/LinkBlock';
import PageBlock from '../components/PageBlock';
import PaymentBlock from '../components/PaymentBlock';
import PageFooter from '../components/PageFooter';
import { getOrCreateCustomer, getCustomer } from '../lib/ops';
import { reorder, remove, add, unprefixUsername, generateBlockId, parseBlockId } from '../lib/utils';
import { postMetadataUpdate, readBlockOrder, readDict } from '../lib/metadataUtils';
import { Direction, BlockType, MetadataValue } from '../lib/typedefs';
import { useRouter } from 'next/router';
import { Box, Checkbox, Link, Badge, Input, IconButton, Flex, Card, Button, Text, Label, Textarea } from 'theme-ui';
import NumberFormat from 'react-number-format';
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
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSession } from 'next-auth/client';

const ADMINS = ['bgdotjpg'];

let DEBUG = true;
if (process.env.NODE_ENV === 'production') {
  DEBUG = false;
}

const UserPage = (props) => {
  const {
    query: {},
  } = useRouter();

  const defaultText = 'edit me';

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

  const fetchStripeConnected = async () => {
    try {
      const response = await fetchJson('/api/stripe_connected', {
        method: 'GET',
      });
      console.dir(response);
      setStripeAccount(response.account);
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
  const initialOrder = readBlockOrder(props.metadata) || [];
  const paymentSettings = readDict(props.metadata, 'payment_settings');
  const [tipsEnabled, setTipsEnabled] = useState(paymentSettings ? paymentSettings.enabled : false);
  const [tipText, setTipText] = useState(paymentSettings ? paymentSettings.text : 'Leave a tip');
  const [defaultTipAmount, setDefaultTipAmount] = useState(paymentSettings ? paymentSettings.defaultAmount : 500);
  const [hideTipsFeed, setHideTipsFeed] = useState(paymentSettings ? paymentSettings.hideFeed : false);
  const [order, setOrder] = useState(initialOrder);
  const [showingNewMenu, setShowingNewMenu] = useState(false);
  const [previewing, setPreviewing] = useState(DEBUG ? false : true);
  const [metadata, setMetadata] = useState(props.metadata);
  const [stripeAccount, setStripeAccount] = useState<object | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const newSettings = {
      text: tipText,
      defaultAmount: defaultTipAmount,
      enabled: tipsEnabled,
      hideFeed: hideTipsFeed,
    };
    syncTipSettings(newSettings);
  }, [tipText, tipsEnabled, defaultTipAmount, hideTipsFeed]);

  const syncTipSettings = async function (newSettings: object) {
    try {
      await postMetadataUpdate('payment_settings', newSettings, props.customerId, props.username);
      // don't need to call setMetadata if updating order only
    } catch (e) {
      console.error(e);
    }
  };

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
      DEBUG && console.table(newMetadata);
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

  const addTextBlock = async () => {
    const id = generateBlockId(BlockType.Text);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    await syncNewBlock(id, defaultText, newItems);
    setOrder(newItems);
  };

  const addLinkBlock = async (content: any) => {
    const id = generateBlockId(BlockType.Link);
    const newItem = { i: id };
    const newItems = add(order, newItem);
    const value = JSON.stringify({ text: content.text, url: content.url, comment: content.comment });
    await syncNewBlock(id, value, newItems);
    setOrder(newItems);
  };

  const generateUrl = async function () {
    try {
      const response = await fetchJson('/api/upload_url', {
        method: 'GET',
      });
      console.dir(response);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const upload = async function () {
    const Uppy = require('@uppy/core');
    const UppyS3 = require('@uppy/aws-s3');
    const uppy = Uppy.Core({
      id: 'uppyUpload', // use an id if you plan to use multiple Uppys (on different pages etc.)
      autoProceed: false, // if true the file uploads as soon as you drag it into the upload area, or select it - your user cannot edit file name or add metadata or tags - for this reason, we use 'false'
      restrictions: {
        // we can add restrictions here:
        maxFileSize: 31457280, //i.e. 30MB
        maxNumberOfFiles: 20,
        minNumberOfFiles: null, // if null, no minimum requirement
        allowedFileTypes: null, // can use an array of extensions, i.e. ['.doc', '.docx', '.xls', '.xlsx']
      },
      logger: Uppy.debugLogger, // use this for debugging to see what's gone wrong
    });
    uppy.use(UppyS3, {
      // use the AwsS3 plugin
      fields: [], // empty array
      getUploadParameters(file) {
        // here we prepare our request to the server for the upload URL
        return fetch('/uploader', {
          // we'll send the info asynchronously via fetch to our nodejs server endpoint, '/uploader' in this case
          method: 'POST', // all the examples I found via the Uppy site used 'PUT' and did not work
          headers: {
            'content-type': 'application/x-www-form-urlencoded', // examples I found via the Uppy site used 'content-type': 'application/json' and did not work
          },
          body: JSON.stringify({
            filename: file.name, // here we are passing data to the server/back end
            contentType: file.type,
            metadata: {
              name: file.meta['name'], // here we pass the 'name' variable to the back end, with 'file.meta['name']' referring to the 'name' from our metaFields id above
              caption: file.meta['caption'], // here we pass the 'caption' variable to the back end, with 'file.meta['caption']' referring to the 'caption' from our metaFields id above
            },
          }),
        })
          .then((response) => {
            return response.json(); // return the server's response as a JSON promise
          })
          .then((data) => {
            console.log('>>>', data); // here you can have a look at the data the server sent back - get rid of this for production!
            return {
              method: data.method, // here we send method, url, fields and headers to the AWS S3 bucket
              url: data.url,
              fields: data.fields,
              headers: data.headers,
            };
          });
      },
    });
    uppy.on('complete', (result) => {
      if (result.successful) {
        console.log('Upload complete! We’ve uploaded these files:', result.successful); // if upload succeeds, let's see what we uploaded
      } else {
        console.log('Upload error: ', result.failed); // if upload failed, let's see what went wrong
      }
    });
  };

  return (
    <Layout>
      <Button
        onClick={async () => {
          await generateUrl();
        }}
      >
        generate url
      </Button>
      {props.error && (
        <Textarea my={4} rows={10}>
          {JSON.stringify(props.error, null, 2)}
        </Textarea>
      )}
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
                              {false && (
                                <Box
                                  sx={{
                                    py: 2,
                                  }}
                                >
                                  <PageBlock
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
                console.log(result);
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

          {stripeAccount && tipsEnabled && (
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
          <Box>
            <Box>
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
                  {session && ADMINS.includes(session.user.username) && (
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
                {!stripeAccount ||
                  (stripeAccount && !stripeAccount['charges_enabled'] && (
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
                  ))}
                {!stripeAccount && (
                  <Text variant="tiny" sx={{ fontFamily: 'mono', pt: 3, color: 'gray' }}>
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
            </Box>
            {stripeAccount && (
              <Box>
                <Flex sx={{ alignItems: 'center' }}>
                  <Flex>
                    <Label sx={{ bg: tipsEnabled ? 'lightGreen' : 'offWhite', p: 1, borderRadius: '8px 8px 0px 0px' }}>
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

          <Flex sx={{ bg: 'transparent', flexDirection: 'row-reverse', mt: 3 }}>
            <Button onClick={() => signOut()} variant="tiny" sx={{ color: 'lightGray', cursor: 'pointer' }}>
              <SignOutButtonIcon />
            </Button>
          </Flex>
        </Card>
      )}
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
