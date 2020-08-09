import React, { useState, useEffect } from "react";
import { Card, Box, IconButton, Button, Flex, Label } from "theme-ui";
import TipJar from "./TipJar";
import { useDebounce } from "use-debounce";
import {
  readString,
  readCardMeta,
  postMetadataUpdate,
  toMetadataValue,
  toCardMeta,
} from "../lib/metadataUtils";
import { CardMeta, MetadataValue } from "../lib/typedefs";
import Stripe from "stripe";
import Editor from "rich-markdown-editor";

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
      if (newVal && typeof newVal === "string") {
        setCardVal(newVal);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateCardMeta = async function (value: CardMeta) {
    try {
      setCardMeta(value);
      const newVal = await postMetadataUpdate(
        `${props.id}.meta`,
        toMetadataValue(value),
        props.customerId,
        props.username
      );
      setCardMeta(toCardMeta(newVal));
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
        py: 0,
        px: 0,
        my: 4,
        border: editing ? "2px solid" : "1px solid",
        borderColor: "text",
        borderRadius: 4,
        bg: "background",
      }}
      hidden={hidden}
    >
      <Box p={2}>
        <Editor
          defaultValue={cardVal}
          readOnly={!editing}
          onChange={(v) => {
            setCardVal(v());
          }}
        />
      </Box>
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
        <Flex sx={{ bg: "outline", borderRadius: 4, py: 2 }}>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <IconButton
              variant="icon"
              sx={{ left: 0 }}
              onClick={() => {
                setEditing(!editing);
              }}
            >
              {editing ? (
                <Box sx={{}}>
                  <svg
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      stroke="#2a2e3b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      transform="translate(3 3)"
                    >
                      <path d="m2 .5h11c1.1045695 0 2 .8954305 2 2v6.04882185c0 1.1045695-.8954305 1.99999995-2 1.99999995-.0025044 0-.0050088-.0000047-.0075132-.0000141l-10.99999997-.0413227c-1.10162878-.0041384-1.99248683-.89834933-1.99248683-1.99998589v-6.00749911c0-1.1045695.8954305-2 2-2z" />
                      <path d="m2.464 12.5h10.036" />
                      <path d="m4.5 14.5h6" />
                    </g>
                  </svg>
                  <Label>View</Label>
                </Box>
              ) : (
                <Box sx={{}}>
                  <svg
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      stroke="#2a2e3b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      transform="translate(2 2)"
                    >
                      <path
                        d="m8.24920737-.79402796c1.17157287 0 2.12132033.94974747 2.12132033 2.12132034v13.43502882l-2.12132033 3.5355339-2.08147546-3.495689-.03442539-13.47488064c-.00298547-1.16857977.94191541-2.11832105 2.11049518-2.12130651.00180188-.00000461.00360378-.00000691.00540567-.00000691z"
                        transform="matrix(.70710678 .70710678 -.70710678 .70710678 8.605553 -3.271644)"
                      />
                      <path d="m13.5 4.5 1 1" />
                    </g>
                  </svg>
                  <Label>Edit</Label>
                </Box>
              )}
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} hidden={editing}>
            <IconButton
              sx={{ left: 0, visibility: props.hideDown ? "hidden" : "visible" }}
              onClick={props.onDown}
            >
              <Box>
                <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="#2a2e3b"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    transform="matrix(0 1 -1 0 20 2)"
                  >
                    <circle cx="8.5" cy="8.5" r="8" />
                    <path
                      d="m11.621 6.379v4.242h-4.242"
                      transform="matrix(.70710678 .70710678 .70710678 -.70710678 -3.227683 7.792317)"
                    />
                    <path d="m8.5 4.5v8" transform="matrix(0 1 -1 0 17 0)" />
                  </g>
                </svg>
              </Box>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} hidden={!editing}>
            <IconButton
              sx={{ left: 0 }}
              onClick={() => {
                toggleTipjar();
              }}
            >
              {cardMeta && cardMeta.tj_v ? (
                <Box sx={{ border: "none" }}>
                  <svg
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      stroke="#2a2e3b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      transform="translate(1 3)"
                    >
                      <path d="m17.5 8.5v3c0 1.2994935-3.1340068 3-7 3-3.86599325 0-7-1.7005065-7-3 0-.4275221 0-1.2608554 0-2.5" />
                      <path d="m3.79385803 9.25873308c.86480173 1.14823502 3.53999333 2.22489962 6.70614197 2.22489962 3.8659932 0 7-1.60524016 7-2.98595204 0-.77476061-.9867994-1.62391104-2.5360034-2.22001882" />
                      <path d="m14.5 3.5v3c0 1.29949353-3.1340068 3-7 3-3.86599325 0-7-1.70050647-7-3 0-.64128315 0-2.35871685 0-3" />
                      <path d="m7.5 6.48363266c3.8659932 0 7-1.60524012 7-2.985952 0-1.38071187-3.1340068-2.99768066-7-2.99768066-3.86599325 0-7 1.61696879-7 2.99768066 0 1.38071188 3.13400675 2.985952 7 2.985952z" />
                    </g>
                  </svg>
                  <Label>Hide</Label>
                </Box>
              ) : (
                <Box>
                  <svg
                    height="21"
                    viewBox="0 0 21 21"
                    width="21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      fill="none"
                      fill-rule="evenodd"
                      stroke="#2a2e3b"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      transform="translate(1 3)"
                    >
                      <path d="m17.5 8.5v3c0 1.2994935-3.1340068 3-7 3-3.86599325 0-7-1.7005065-7-3 0-.4275221 0-1.2608554 0-2.5" />
                      <path d="m3.79385803 9.25873308c.86480173 1.14823502 3.53999333 2.22489962 6.70614197 2.22489962 3.8659932 0 7-1.60524016 7-2.98595204 0-.77476061-.9867994-1.62391104-2.5360034-2.22001882" />
                      <path d="m14.5 3.5v3c0 1.29949353-3.1340068 3-7 3-3.86599325 0-7-1.70050647-7-3 0-.64128315 0-2.35871685 0-3" />
                      <path d="m7.5 6.48363266c3.8659932 0 7-1.60524012 7-2.985952 0-1.38071187-3.1340068-2.99768066-7-2.99768066-3.86599325 0-7 1.61696879-7 2.99768066 0 1.38071188 3.13400675 2.985952 7 2.985952z" />
                    </g>
                  </svg>
                  <Label sx={{ whiteSpace: "nowrap" }}>+ Tips</Label>
                </Box>
              )}
            </IconButton>
          </Box>
          <Box sx={{ visibility: props.hideUp ? "hidden" : "visible" }} hidden={editing}>
            <IconButton sx={{ right: 0, mr: 2 }} onClick={props.onUp}>
              <Box>
                <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="#2a2e3b"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    transform="matrix(0 -1 1 0 2 19)"
                  >
                    <circle cx="8.5" cy="8.5" r="8" />
                    <path
                      d="m11.621 6.379v4.242h-4.242"
                      transform="matrix(.70710678 .70710678 .70710678 -.70710678 -3.227683 7.792317)"
                    />
                    <path d="m8.5 4.5v8" transform="matrix(0 1 -1 0 17 0)" />
                  </g>
                </svg>
              </Box>
            </IconButton>
          </Box>
          <Box hidden={!editing}>
            <IconButton
              sx={{ mr: 3 }}
              onClick={() => {
                props.onDelete();
              }}
            >
              <Box>
                <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="#2a2e3b"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    transform="translate(3 2)"
                  >
                    <path d="m2.5 2.5h10v12c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2zm5-2c1.1045695 0 2 .8954305 2 2h-4c0-1.1045695.8954305-2 2-2z" />
                    <path d="m.5 2.5h14" />
                    <path d="m5.5 5.5v8" />
                    <path d="m9.5 5.5v8" />
                  </g>
                </svg>
                <Label>Delete</Label>
              </Box>
            </IconButton>
          </Box>
        </Flex>
      )}
    </Card>
  );
};
