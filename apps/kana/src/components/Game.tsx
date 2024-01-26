import { For, Show, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { css } from "styled-system/css";

import { kanaGroups } from "~/lib/kana";
import { useSelected } from "~/lib/selected";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function Game(props) {
  const { mode, selected } = useSelected();

  const kana = Object.entries(kanaGroups)
    .flatMap(([title, group]) =>
      group.flatMap((row, i) => (selected[title][i] ? row : []))
    )
    .filter((info) => info != null);

  const [index, setIndex] = createSignal(0);
  const [misses, setMisses] = createStore(Array(kana.length).fill(0));

  let textfield;

  onMount(() => {
    textfield && textfield.focus();
  });

  return (
    <main
      class={css({
        position: "relative",
        overflowX: "hidden",
      })}
    >
      <Button onClick={props.onEnd}>Return</Button>
      <Button onClick={[setIndex, index() + 1]}>Skip</Button>
      <div class={css({})}>
        <Show when={index() < kana.length && (index() & 1) == 0}>
          <Test index={index()} mode={mode()} kana={kana} />
        </Show>
        <Show when={index() < kana.length && (index() & 1) == 1}>
          <Test index={index()} mode={mode()} kana={kana} />
        </Show>
        <Input
          type="text"
          size="2xl"
          class={css({
            fontWeight: "bold",
            textAlign: "center",
            width: 48,
            display: "block",
            mx: "auto",
          })}
          maxLength={3}
          autofocus
          autocapitalize="none"
          ref={textfield}
          onKeyPress={(e) => {
            if (!(e.key === "Enter" || e.key === " ")) return;
            e.preventDefault();

            if (kana[index()].romaji.includes(e.currentTarget.value)) {
              setIndex(index() + 1);
            } else {
              setMisses(index(), (attempt) => attempt + 1);
            }

            e.currentTarget.value = "";
          }}
        />
      </div>
      {/* <For each={kana}>
        {(info, i) => <div>{misses[i()] ? info[mode()] : "GOT"}</div>}
      </For> */}
    </main>
  );
}

function Test(props) {
  return (
    <>
      <Show when={props.index}>
        <div
          class={css({
            position: "absolute",
            animation: "slideLeft 500ms forwards",
            width: "100%",
            fontSize: "9xl",
            fontWeight: "black",
            textAlign: "center",
          })}
        >
          {props.kana[props.index - 1][props.mode]}
        </div>
      </Show>
      <div
        class={css({
          animation: "slideFromRight 500ms",
          width: "100%",
          fontSize: "9xl",
          fontWeight: "black",
          textAlign: "center",
        })}
      >
        {props.kana[props.index][props.mode]}
      </div>
    </>
  );
}
