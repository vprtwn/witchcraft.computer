import React, { useState } from "react";
import { Card, Label, Text, Button, Select, Box, useColorMode, Badge } from "theme-ui";
import fetchJson from "../lib/fetchJson";
import { StripeAccountData, StyleData } from "../lib/typedefs";

export default (props) => {
  const defaultStyle: StyleData = { colorMode: "light" };
  let stripeAccount: StripeAccountData | null = null;
  let remoteStyle = defaultStyle;
  if (props.metadata) {
    if (props.metadata["style"]) {
      remoteStyle = JSON.parse(props.metadata["style"]);
    }
    if (props.metadata["stripeAccount"]) {
      stripeAccount = JSON.parse(props.metadata["stripeAccount"]);
    }
    console.log("account", JSON.stringify(stripeAccount));
  }

  const [style, setStyle] = useState(remoteStyle);
  const [colorMode, setColorMode] = useColorMode();
  if (colorMode != style.colorMode) {
    setColorMode(colorMode);
  }

  const updateStyle = async function (style) {
    try {
      const metadata = { style: JSON.stringify(style) };
      const params = {
        username: props.username,
        metadata: metadata,
        customerId: props.customerId,
      };
      const result = await fetchJson(`/api/update_metadata`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID}&scope=read_write&state=${props.username}`;

  return (
    <Card
      sx={{
        p: 3,
        my: 2,
        bg: "outline",
        border: "2px solid",
        borderColor: "primary",
      }}
    >
      <Box pb={2}>
        <Label>{stripeAccount ? "Tips enabled" : "Enable tips"}</Label>
        {!stripeAccount && (
          <Text variant="small">
            To let people leave tips, connect your Stripe account.{" "}
            <Button
              variant="tinywide"
              onClick={() => {
                window.location.assign(connectUrl);
              }}
            >
              Connect Stripe
            </Button>{" "}
            <Button
              variant="tinywide"
              onClick={() => {
                console.log("TODO");
              }}
            >
              Learn more
            </Button>
          </Text>
        )}
        {stripeAccount && (
          <Text variant="small">
            Flexjar is connected to your Stripe account{" "}
            <Badge variant="tiny">{stripeAccount.name}</Badge>
          </Text>
        )}
      </Box>

      <Label>Style</Label>
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
  );
};
