// @refresh reload
import { For, Show, createSignal } from "solid-js";
import { css } from "../styled-system/css";
import { Button } from "~/components/ui/button";
import { gojuonKana, dakuonKana, comboKana } from "~/lib/kana";

import "./index.css";

export default function App() {
  const [count, setCount] = createSignal(0);

  return (
    <main class={css({ p: 4, m: "auto", maxWidth: "breakpoint-lg" })}>
      <div
        class={css({
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "start",
          gap: 16,
        })}
      >
        <div class={css({ flexGrow: 1 })}>
          <h2 class={css({ fontSize: "2xl", fontWeight: "bold", mb: "2" })}>
            Gojūon
          </h2>
          <div class={css({ display: "grid", gridTemplateColumns: 5, gap: 2 })}>
            <KanaGroup group={gojuonKana} />
          </div>
        </div>
        <div class={css({ flexGrow: 1 })}>
          <h2 class={css({ fontSize: "2xl", fontWeight: "bold", mb: "2" })}>
            Dakuon
          </h2>
          <div class={css({ display: "grid", gridTemplateColumns: 5, gap: 2 })}>
            <KanaGroup group={dakuonKana} />
          </div>
        </div>
        <div class={css({ flexGrow: 1 })}>
          <h2 class={css({ fontSize: "2xl", fontWeight: "bold", mb: "2" })}>
            Combo
          </h2>
          <div class={css({ display: "grid", gridTemplateColumns: 3, gap: 2 })}>
            <KanaGroup group={comboKana} />
          </div>
        </div>
      </div>
    </main>
  );
}

function KanaGroup(props) {
  return (
    <For each={props.group}>
      {(row) => (
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
                <div class={css({ py: 2, px: 3, width: "100%" })}>
                  {kanaInfo.hira}
                  <div>{kanaInfo.romaji[0]}</div>
                </div>
              </Show>
            </Button>
          )}
        </For>
      )}
    </For>
  );
}
