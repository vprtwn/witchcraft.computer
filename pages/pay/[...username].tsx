import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import LinkBlock from '../../components/LinkBlock';
import PaymentBlock from '../../components/PaymentBlock';
import PageFooter from '../../components/PageFooter';
import { useDebounce } from 'use-debounce';
import { reorder, parseBlockId } from '../../lib/utils';
import { transformPageData, updatePage } from '../../lib/updatePage';
import { Direction, BlockType } from '../../lib/typedefs';
import {
  Box,
  Checkbox,
  Link,
  Badge,
  Alert,
  Input,
  IconButton,
  Flex,
  Card,
  Button,
  Text,
  Label,
  Textarea,
} from 'theme-ui';
import NumberFormat from 'react-number-format';
import { GetServerSideProps } from 'next';
import { signOut, getSession } from 'next-auth/client';
import fetchJson from '../../lib/fetchJson';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditButtonIcon from '../../components/EditButtonIcon';
import CloseButtonIcon from '../../components/CloseButtonIcon';
import SignOutButtonIcon from '../../components/SignOutButtonIcon';
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
      const response = await fetchJson(`/api/bootstrap`, {
        method: 'GET',
      });
      if (response.error) {
        setAlert(response.error);
      }
      setStripeAccount(response.stripeAccount);
      setUploadUrl(response.uploadUrl);
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
  const [alert, setAlert] = useState<string | null>(null);

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

  const syncPaymentSettings = async function (newSettings: object) {
    try {
      // todo: fix this
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
                              {/* TODO: create template blocks for venmo, cashapp, etc
                                no deletion allowed.
                              */}
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
                                    onDelete={null}
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
        <Card variant="card_dotted_gray">
          <Box sx={{ mb: 3 }}>
            <Flex sx={{ alignItems: 'center' }}>
              <Flex>
                <Label sx={{ bg: 'lightBlue', p: 1, borderRadius: '8px 8px 0px 0px' }}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Text variant="text_sm">{stripeAccount ? 'Connected to Stripe' : 'Connect Stripe account'}</Text>
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
                {stripeAccount && <Text variant="text_xs">{stripeAccount['id']}</Text>}
                {stripeAccount && session && ['bgdotjpg'].includes(session.user.username) && (
                  <Button
                    variant="button_small"
                    onClick={() => {
                      disconnectStripe();
                    }}
                  >
                    Disconnect Stripe
                  </Button>
                )}
              </Flex>
              {!stripeAccount && (
                <Text variant="text_xs">
                  Monetize your <Badge variant="badge_outline">tray</Badge> by collecting tips.
                </Text>
              )}
              {(!stripeAccount || (stripeAccount && !stripeAccount['charges_enabled'])) && (
                <Box pt={2}>
                  <Button
                    variant="button_emphasis"
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
                <Text variant="text_xs" sx={{ pt: 2, color: 'gray' }}>
                  ^ You'll be redirected to create an account with Stripe, our payments provider. Stripe collects a{' '}
                  <Link variant="link_standard" href="https://stripe.com/pricing#pricing-details">
                    fee
                  </Link>{' '}
                  on payments.
                </Text>
              )}
              {stripeAccount && !stripeAccount['charges_enabled'] && (
                <Text variant="text_xs" sx={{ fpt: 2, color: 'gray' }}>
                  ^ Payments are not yet enabled on your Stripe account. You'll be redirected to Stripe to continue
                  setting up your account.
                </Text>
              )}
            </Box>
            {stripeAccount && (
              <Box>
                <Flex sx={{ alignItems: 'center' }}>
                  <Flex>
                    <Label sx={{ bg: tipsEnabled ? 'lightGreen' : 'offWhite', p: 1, borderRadius: '8px 8px 0px 0px' }}>
                      <Flex sx={{ alignItems: 'center' }}>
                        <Checkbox defaultChecked={tipsEnabled} onChange={(e) => setTipsEnabled(e.target.checked)} />
                        <Text variant="text_sm">Enable tips</Text>
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
                      variant="input_standard"
                      disabled={!tipsEnabled}
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
                        <Text variant="text_xs">Hide feed</Text>
                      </Flex>
                    </Label>
                  )}
                </Box>
              </Box>
            )}
          </Box>

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

  return { props: {} };
};
export default UserPage;
