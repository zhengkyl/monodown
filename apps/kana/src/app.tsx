// @refresh reload
import "./index.css";
import { For, Show, createSignal } from "solid-js";
import { Square } from "lucide-solid";
import { css } from "../styled-system/css";

import { gojuonKana, dakuonKana, comboKana } from "~/lib/kana";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/ui/iconButton";
import { SelectedProvider, useSelected } from "~/components/selected";

export default function App() {
  const [mode, setMode] = createSignal("hira");
  const [isSelecting, setIsSelecting] = createSignal(false);

  return (
    <SelectedProvider>
      <main class={css({ display: "flex" })}>
        <div
          class={css({
            position: "fixed",
            inset: 0,
            p: 4,
            display: "flex",
            flexDir: "column",
            justifyContent: "space-between",
            pointerEvents: "none",
            zIndex: 10,
            lg: {
              position: "sticky",
              height: "100svh",
              maxWidth: "96",
              flex: 1,
            },
          })}
        >
          <div
            class={css({
              borderWidth: 1,
              borderColor: "gray.a8",
              borderRadius: "md",
              display: "flex",
              gap: 1,
              p: 1,
              pointerEvents: "all",
              boxShadow: "2xl",
              background: "bg.default",
            })}
          >
            <Button
              variant={mode() == "hira" ? "solid" : "ghost"}
              onClick={[setMode, "hira"]}
              class={css({ flex: 1 })}
            >
              Hiragana
            </Button>
            <Button
              variant={mode() == "kata" ? "solid" : "ghost"}
              onClick={[setMode, "kata"]}
              class={css({ flex: 1 })}
            >
              Katakana
            </Button>
          </div>
          <div
            class={css({
              pointerEvents: "all",
              boxShadow: "2xl",
            })}
          >
            <Button
              width="100%"
              mb={1}
              onClick={[setIsSelecting, !isSelecting()]}
            >
              Practice
            </Button>
            <Button width="100%" variant="outline" background="bg.default">
              Learn
            </Button>
          </div>
        </div>
        <div
          class={css({
            flex: 4,
            p: 4,
            mt: 16,
            mb: 24,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            lg: {
              flexDirection: "row",
              my: 0,
              mx: "auto",
              justifyContent: "center",
              alignItems: "start",
              maxWidth: "breakpoint-lg",
            },
          })}
        >
          <div
            class={css({
              display: "grid",
              gridTemplateColumns: "auto repeat(5, minmax(0, 1fr))",
              gap: 2,
              marginLeft: isSelecting() ? 0 : -12,
              transition: "margin 300ms",
              flexGrow: 1,
            })}
          >
            <KanaGroup
              title="Gojūon"
              group={gojuonKana}
              mode={mode()}
              isSelecting={isSelecting()}
            />
          </div>
          <div
            class={css({
              display: "grid",
              gridTemplateColumns: "auto repeat(5, minmax(0, 1fr))",
              gap: 2,
              marginLeft: isSelecting() ? 0 : -12,
              transition: "margin 300ms",
              flexGrow: 1,
            })}
          >
            <KanaGroup
              title="Dakuon"
              group={dakuonKana}
              mode={mode()}
              isSelecting={isSelecting()}
            />
          </div>
          <div
            class={css({
              display: "grid",
              gridTemplateColumns: "auto repeat(3, minmax(0, 1fr))",
              gap: 2,
              marginLeft: isSelecting() ? 0 : -12,
              transition: "margin 300ms",
              flexGrow: 1,
            })}
          >
            <KanaGroup
              title="Combo"
              group={comboKana}
              mode={mode()}
              isSelecting={isSelecting()}
            />
          </div>
        </div>
      </main>
    </SelectedProvider>
  );
}

function KanaGroup(props) {
  const [selected, setSelected] = useSelected();

  const allSelected = () => {
    console.log("allSel", props.title);
    return selected[props.title].every((s) => s);
  };

  return (
    <>
      <IconButton
        variant="outline"
        onClick={() =>
          setSelected(
            props.title,
            Array(selected[props.title].length).fill(!allSelected())
          )
        }
        class={css({
          opacity: props.isSelecting ? null : 0,
          transitionProperty:
            "background, border-color, color, box-shadow, opacity",
        })}
      >
        <Square
          stroke-width={1.5}
          classList={{
            [css({ height: 7, width: 7 })]: true,
            [css({ fill: "currentColor" })]: allSelected(),
          }}
        />
      </IconButton>
      <h2
        class={css({
          fontSize: "2xl",
          fontWeight: "bold",
          gridColumn: "2 / -1",
          alignSelf: "end",
        })}
      >
        {props.title}
      </h2>
      <For each={props.group}>
        {(row, i) => {
          const rowSelected = () =>
            props.isSelecting && selected[props.title][i()];
          return (
            <>
              <IconButton
                variant="outline"
                class={css({
                  height: 8,
                  width: 8,
                  minWidth: 0,
                  justifySelf: "end",
                  alignSelf: "center",
                  transitionProperty:
                    "background, border-color, color, box-shadow, opacity",
                  opacity: props.isSelecting ? null : 0,
                })}
                onClick={() =>
                  setSelected(props.title, i(), !selected[props.title][i()])
                }
              >
                <Square
                  classList={{
                    [css({ fill: "currentColor" })]: selected[props.title][i()],
                  }}
                />
              </IconButton>
              <For each={row}>
                {(kanaInfo) => {
                  const exists = kanaInfo != null;
                  return (
                    <Button
                      variant={exists && rowSelected() ? "solid" : "outline"}
                      class={css({
                        px: 0,
                        fontSize: "md",
                        height: "unset",
                        userSelect: "text",
                        _disabled: {
                          cursor: "default",
                        },
                      })}
                      disabled={!exists}
                    >
                      <Show when={exists}>
                        <div class={css({ p: 2, width: "100%" })}>
                          {kanaInfo[props.mode]}
                          <div class={css({ fontSize: "sm" })}>
                            {kanaInfo.romaji[0]}
                          </div>
                        </div>
                      </Show>
                    </Button>
                  );
                }}
              </For>
            </>
          );
        }}
      </For>
    </>
  );
}
