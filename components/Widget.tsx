import React, { useState, useEffect } from "react";
import { Card, Box, IconButton, Button, Flex, Text } from "theme-ui";
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from "react-live";
import TipJar from "./TipJar";
import { useDebounce } from "use-debounce";
import MDX from "@mdx-js/runtime";
import { theme } from "../lib/editorTheme";
import {
  readString,
  readCardMeta,
  postMetadataUpdate,
  toMetadataValue,
  toCardMeta,
} from "../lib/metadataUtils";
import { CardMeta, MetadataValue } from "../lib/typedefs";
const emoji = require("remark-emoji");
import rehypeSanitize from "rehype-sanitize";
const smartypants = require("@silvenon/remark-smartypants");
import Stripe from "stripe";

const DEBOUNCE_MS = 700;

export default (props) => {
  const defaultMd = ":wave: **hi**";
  const signedIn = props.signedIn;
  let initialMd = readString(props.metadata, props.id, props.signedIn ? defaultMd : null);
  const remoteCardMeta = readCardMeta(props.metadata, `${props.id}.meta`);
  const initialTipText = remoteCardMeta ? remoteCardMeta.tj_t : null;
  let showEditor = signedIn;
  let hidden = false;
  if (!signedIn && !initialMd) {
    hidden = true;
  }
  const [editing, setEditing] = useState(false);
  const [cardVal, setCardVal] = useState(initialMd);
  const [cardMeta, setCardMeta] = useState<CardMeta>(remoteCardMeta);
  const [tipText, setTipText] = useState(initialTipText);
  const [debouncedCardVal] = useDebounce(cardVal, DEBOUNCE_MS);
  const [debouncedTipText] = useDebounce(tipText, DEBOUNCE_MS);

  useEffect(() => {
    updateCardValue(debouncedCardVal);
  }, [debouncedCardVal]);

  useEffect(() => {
    updateCardMeta({ tj_t: debouncedTipText, tj_v: cardMeta ? cardMeta.tj_v : null });
  }, [debouncedTipText]);

  const updateCardValue = async function (value) {
    try {
      const newVal = (await postMetadataUpdate(
        props.id,
        value,
        props.customerId,
        props.username
      )) as Stripe.Metadata;
      // if (typeof newVal === "string") {
      // setCardVal(newVal);
      // }
    } catch (e) {
      console.error(e);
    }
  };

  const updateCardMeta = async function (value: CardMeta) {
    try {
      const newVal = await postMetadataUpdate(
        `${props.id}.meta`,
        toMetadataValue(value),
        props.customerId,
        props.username
      );
      // setCardMeta(toCardMeta(newVal));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTipjar = async function () {
    const visible = cardMeta ? cardMeta.tj_v : null;
    let newVisible = visible;
    if (!visible || visible === undefined) {
      newVisible = "1";
    } else {
      newVisible = null;
    }
    await updateCardMeta({ tj_v: newVisible, tj_t: cardMeta ? cardMeta.tj_t : null });
  };

  const components = {
    h1: (props) => <h1 style={{ lineHeight: 1 }} {...props} />,
    h2: (props) => <h2 style={{ lineHeight: 1 }} {...props} />,
    h3: (props) => <h3 style={{ lineHeight: 1 }} {...props} />,
    h4: (props) => <h4 style={{ lineHeight: 1 }} {...props} />,
    h5: (props) => <h5 style={{ lineHeight: 1 }} {...props} />,
    h6: (props) => <h6 style={{ lineHeight: 1 }} {...props} />,
    p: (props) => <p style={{ lineHeight: 1.5 }} {...props} />,
    a: (props) => <a style={{ color: "#4299e1" }} {...props} />,
    img: (props) => (
      <img style={{ maxWidth: 300, display: "block", margin: "0 auto" }} {...props} />
    ),
  };

  return (
    <Card
      sx={{
        p: 0,
        my: 2,
        border: editing ? "2px solid" : "1px solid",
        borderColor: editing ? "primary" : "outline",
        borderRadius: 4,
      }}
      hidden={hidden}
    >
      <LiveProvider
        theme={theme}
        language={"markdown"}
        transformCode={(c) => {
          const newCode = `
<MDX 
  remarkPlugins={[emoji, smartypants]} 
  rehypePlugins={[[rehypeSanitize]]} 
  components={components}>
  {\`${c}\`}
</MDX>;
`;
          return newCode;
        }}
        scope={{
          MDX,
          emoji,
          smartypants,
          rehypeSanitize,
          components,
        }}
        code={cardVal}
      >
        <Box sx={{ position: "relative" }}>
          <LivePreview
            style={{
              fontFamily: "Inter",
              paddingTop: "0.5em",
              paddingBottom: "1em",
              marginLeft: "1em",
              marginRight: "1em",
            }}
          />
        </Box>
        {showEditor && editing && (
          <LiveEditor
            style={{
              fontSize: "16px",
              fontFamily: "Recursive",
            }}
            onChange={(e) => {
              setCardVal(e);
            }}
          />
        )}
        {showEditor && editing && <LiveError />}
      </LiveProvider>
      {cardMeta && cardMeta.tj_v && (
        <TipJar
          data={cardMeta}
          editing={editing}
          onTipTextChange={(e) => {
            setTipText(e.target.value);
          }}
        />
      )}
      {showEditor && !props.hideToolbar && (
        <Flex sx={{ bg: "outline", borderRadius: 4 }}>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <IconButton
              variant="icon"
              sx={{ left: 0 }}
              onClick={() => {
                setEditing(!editing);
              }}
            >
              {editing ? "👁" : "✏️"}
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} hidden={editing}>
            <IconButton
              sx={{ left: 0, visibility: props.hideDown ? "hidden" : "visible" }}
              onClick={props.onDown}
            >
              ⬇️
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} hidden={!editing}>
            <Button
              sx={{ left: 0 }}
              onClick={() => {
                toggleTipjar();
              }}
              variant="tinywide"
            >
              {cardMeta && cardMeta.tj_v ? "Remove tipjar" : "Add a tipjar"}
            </Button>
          </Box>
          <Box sx={{ visibility: props.hideUp ? "hidden" : "visible" }} hidden={editing}>
            <IconButton sx={{ right: 0, mr: 2 }} onClick={props.onUp}>
              ⬆️
            </IconButton>
          </Box>
          <Box hidden={!editing}>
            <IconButton
              sx={{ right: 0, mr: 2 }}
              onClick={() => {
                props.onDelete();
              }}
            >
              🗑
            </IconButton>
          </Box>
        </Flex>
      )}
    </Card>
  );
};
