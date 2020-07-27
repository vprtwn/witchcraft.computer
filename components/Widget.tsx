import React, { useState, useEffect } from "react";
import { Card, Box, IconButton, Button, Flex, Text } from "theme-ui";
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from "react-live";
import fetchJson from "../lib/fetchJson";
import TipJar from "./TipJar";
import { useDebounce } from "use-debounce";
import MDX from "@mdx-js/runtime";
import { theme } from "../lib/editorTheme";
const emoji = require("remark-emoji");
import rehypeSanitize from "rehype-sanitize";
const smartypants = require("@silvenon/remark-smartypants");

export default (props) => {
  const defaultVal = ":wave: **hi**";
  const signedIn = props.signedIn;
  let initialMd = null;
  let remoteVal = null;
  if (props.metadata && props.metadata[props.id]) {
    remoteVal = props.metadata[props.id];
    try {
      remoteVal = JSON.parse(remoteVal);
    } catch (e) {}
    initialMd = remoteVal.md;
  }
  let showEditor = signedIn;
  let hidden = false;
  if (!signedIn && !initialMd) {
    hidden = true;
  }
  if (signedIn && !initialMd) {
    initialMd = defaultVal;
  }
  const [editing, setEditing] = useState(false);
  const [md, setMd] = useState(initialMd);
  const [val, setVal] = useState(remoteVal);
  const [tipText, setTipText] = useState(remoteVal);
  const [debouncedMd] = useDebounce(md, 700);

  useEffect(() => {
    updateMetadata({ md: debouncedMd });
  }, [debouncedMd]);

  const updateMetadata = async function (value) {
    try {
      const metadata = {};
      metadata[props.id] = value;
      const params = {
        username: props.username,
        metadata: metadata,
        customerId: props.customerId,
      };
      const newMetadata = await fetchJson(`/api/update_metadata`, {
        method: "POST",
        body: JSON.stringify(params),
      });
      let newVal = newMetadata[props.id];
      try {
        newVal = JSON.parse(newVal);
      } catch (e) {}
      setVal(newVal);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTipjar = async function () {
    console.log("val", val);
    const currentTipjar = val["tj"];
    let newTipjar = currentTipjar;
    if (!currentTipjar || currentTipjar === undefined) {
      newTipjar = {};
    } else {
      newTipjar = null;
    }
    await updateMetadata({ tj: newTipjar });
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
        code={md}
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
              setMd(e);
            }}
          />
        )}
        {showEditor && editing && <LiveError />}
      </LiveProvider>
      {val && val.tj && (
        <TipJar
          data={val.tj}
          editing={editing}
          onTipMessageChange={(e) => {
            console.log(e.target.value);
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
              {val && val.tj ? "Remove tipjar" : "Add a tipjar"}
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
