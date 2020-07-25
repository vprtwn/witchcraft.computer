import React, { useState, useEffect } from "react";
import { Card, Box, IconButton, Button, Flex } from "theme-ui";
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from "react-live";
import fetchJson from "../lib/fetchJson";
import { useDebounce } from "use-debounce";
import MDX from "@mdx-js/runtime";
import { theme } from "../lib/editorTheme";
const emoji = require("remark-emoji");
import rehypeSanitize from "rehype-sanitize";
const smartypants = require("@silvenon/remark-smartypants");

export default (props) => {
  const defaultVal = ":wave: **hi**";
  const signedIn = props.signedIn;
  const indexString = props.index.toString();
  let initialVal = props.metadata ? props.metadata[indexString] : null;
  let showEditor = signedIn;
  let hidden = false;
  if (!signedIn && !initialVal) {
    hidden = true;
  }
  if (signedIn && !initialVal) {
    initialVal = defaultVal;
  }
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(initialVal);
  const [dbVal] = useDebounce(val, 700);

  useEffect(() => {
    const update = async function () {
      try {
        const metadata = {};
        metadata[indexString] = dbVal;
        const params = {
          username: props.username,
          metadata: metadata,
          customerId: props.customerId,
        };
        await fetchJson(`/api/update_metadata`, {
          method: "POST",
          body: JSON.stringify(params),
        });
        console.log("updated metadata", JSON.stringify(metadata));
      } catch (e) {
        console.error(e);
      }
    };
    update();
  }, [dbVal]);

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
        code={val}
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
              setVal(e);
            }}
          />
        )}
        {showEditor && editing && <LiveError />}
      </LiveProvider>
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
