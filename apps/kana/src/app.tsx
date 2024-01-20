// @refresh reload
import "./index.css";
import { For, Show, createSignal, useContext } from "solid-js";
import { css } from "../styled-system/css";

import { gojuonKana, dakuonKana, comboKana } from "~/lib/kana";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/ui/iconButton";
import { CheckSquare, CheckSquare2, Square } from "lucide-solid";
import { SelectedProvider, useSelected } from "./components/selected";

export default function App() {
  const [count, setCount] = createSignal(0);

  const [mode, setMode] = createSignal("hira");

  return (
    <SelectedProvider>
      <main class={css({ display: "flex" })}>
        <div class={css({ position: "sticky", top: 0, height: "100%", p: 4 })}>
          <div
            class={css({
              borderWidth: 1,
              borderColor: "gray.a8",
              borderRadius: "md",
              display: "flex",
              p: 1,
              gap: 1,
              width: "100%",
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

          <Button width="100%">Practice</Button>
          <Button width="100%" variant="outline">
            Learn
          </Button>
        </div>
        <div
          class={css({
            flex: 1,
            maxWidth: "breakpoint-lg",
            mx: "auto",
            p: 4,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "start",
            gap: 16,
          })}
        >
          <div class={css({ flexGrow: 1 })}>
            <div
              class={css({
                display: "grid",
                gridTemplateColumns: "auto repeat(5, minmax(0, 1fr))",
                gap: 2,
              })}
            >
              <KanaGroup title="Gojūon" group={gojuonKana} />
            </div>
          </div>
          <div class={css({ flexGrow: 1 })}>
            <div
              class={css({
                display: "grid",
                gridTemplateColumns: "auto repeat(5, minmax(0, 1fr))",
                gap: 2,
              })}
            >
              <KanaGroup title="Dakuon" group={dakuonKana} />
            </div>
          </div>
          <div class={css({ flexGrow: 1 })}>
            <div
              class={css({
                display: "grid",
                gridTemplateColumns: "auto repeat(3, minmax(0, 1fr))",
                gap: 2,
              })}
            >
              <KanaGroup title="Combo" group={comboKana} />
            </div>
          </div>
        </div>
      </main>
    </SelectedProvider>
  );
}

function KanaGroup(props) {
  const [selected, setSelected] = useSelected();

  const allSelected = () => selected[props.title].every(Boolean);

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
        {(row, i) => (
          <>
            <IconButton
              variant="outline"
              class={css({
                height: 8,
                width: 8,
                minWidth: 0,
                justifySelf: "end",
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
              {(kanaInfo) => (
                <Button
                  variant="outline"
                  class={css({
                    px: 0,
                    fontSize: "md",
                    height: "unset",
                    userSelect: "text",
                    _disabled: {
                      cursor: "default",
                    },
                  })}
                  disabled={kanaInfo == null}
                >
                  <Show when={kanaInfo != null}>
                    <div class={css({ p: 2, width: "100%" })}>
                      {kanaInfo.hira}
                      <div class={css({ fontSize: "sm" })}>
                        {kanaInfo.romaji[0]}
                      </div>
                    </div>
                  </Show>
                </Button>
              )}
            </For>
          </>
        )}
      </For>
    </>
  );
}
