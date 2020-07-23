import React, { useState, useEffect } from "react";
import { Card, Button } from "theme-ui";
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from "react-live";
import fetchJson from "../lib/fetchJson";
import { useDebounce } from "use-debounce";
import MDX from "@mdx-js/runtime";
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
  const [editing, setEditing] = useState(showEditor);
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
    Demo: (props) => <h3>This is a demo component</h3>,
  };

  return (
    <Card sx={{ p: 2, position: "relative" }} hidden={hidden}>
      {showEditor && (
        <Button
          variant="small"
          sx={{ position: "absolute", right: 2 }}
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {editing ? "view" : "edit"}
        </Button>
      )}
      <LiveProvider
        transformCode={(code) => {
          const newCode = `
  render(<MDX remarkPlugins={[emoji]} rehypePlugins={[sanitize]} components={components}>{\`
  ${code}
  \`}
  </MDX>);
`;
          console.log(newCode);
          return newCode;
        }}
        noInline={true}
        scope={{ MDX, emoji, sanitize, components }}
        code={val}
      >
        <LivePreview
          style={{
            marginBottom: "12px",
          }}
        />
        {showEditor && editing && (
          <LiveEditor
            style={{
              backgroundColor: "#f7fafc",
              fontSize: "16px",
            }}
            onChange={(e) => {
              setVal(e);
            }}
          />
        )}
        {showEditor && editing && <LiveError />}
      </LiveProvider>
    </Card>
  );
};
