import React, { useState, useEffect } from "react";
import { Card, Container } from "theme-ui";
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from "react-live";
import fetchJson from "../lib/fetchJson";
import { useDebounce } from "use-debounce";
import MDX from "@mdx-js/runtime";
const emoji = require("remark-emoji");
var sanitize = require("rehype-sanitize");

export default (props) => {
  const defaultVal = "<span></span>";
  const indexString = props.index.toString();
  console.log(props.metadata[indexString]);
  const initialVal = props.metadata ? props.metadata[indexString] : defaultVal;
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
    <Card>
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
        <LiveEditor
          style={{
            backgroundColor: "#f7fafc",
            fontSize: "15px",
          }}
          onChange={(e) => {
            setVal(e);
          }}
        />
        <LiveError />
      </LiveProvider>
    </Card>
  );
};
