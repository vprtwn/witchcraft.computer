import React, { useState, useEffect } from "react";
import { Card, Box, IconButton, Button, Flex } from "theme-ui";
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from "react-live";
import fetchJson from "../lib/fetchJson";
import { useDebounce } from "use-debounce";
import MDX from "@mdx-js/runtime";
import { theme } from "../lib/editorTheme";
const emoji = require("remark-emoji");
var sanitize = require("rehype-sanitize");

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
    p: (props) => <p style={{ lineHeight: 1 }} {...props} />,
  };

  return (
    <Card
      sx={{
        p: 0,
        my: 2,
        boxShadow: editing ? "0 0 8px rgba(0, 0, 0, 0.125)" : "none",
        border: editing ? "none" : "1px solid",
        borderColor: editing ? "none" : "lightgray",
      }}
      hidden={hidden}
    >
      <LiveProvider
        theme={theme}
        language={"markdown"}
        transformCode={(code) => {
          const newCode = `
  <MDX remarkPlugins={[emoji]} rehypePlugins={[sanitize]} components={components}>{\`
  ${code}
  \`}
  </MDX>;
`;
          console.log(newCode);
          return newCode;
        }}
        scope={{ MDX, emoji, sanitize, components }}
        code={val}
      >
        <Box sx={{ position: "relative" }}>
          <LivePreview
            style={{
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
            }}
            onChange={(e) => {
              setVal(e);
            }}
          />
        )}
        {showEditor && editing && <LiveError />}
      </LiveProvider>
      {showEditor && !props.hideToolbar && (
        <Flex sx={{ bg: "lightgray" }}>
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
