import { For, Show, createSignal } from "solid-js";
import { css } from "styled-system/css";
import { kanaGroups } from "~/lib/kana";
import { useSelected } from "~/lib/selected";
import { Button } from "./ui/Button";

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

  return (
    <main
      class={css({
        position: "relative",
        overflowX: "hidden",
        height: "50svh",
      })}
    >
      <Button onClick={props.onEnd}>Return</Button>
      <Button onClick={[setIndex, index() - 1]}>Prev</Button>
      <Button onClick={[setIndex, index() + 1]}>Next</Button>
      <div
        class={css({
          marginLeft: "calc(50vw - 6rem)",
        })}
      >
        <Show when={index() < kana.length && (index() & 1) == 0}>
          <Test index={index()} mode={mode()} kana={kana} />
        </Show>
        <Show when={index() < kana.length && (index() & 1) == 1}>
          <Test index={index()} mode={mode()} kana={kana} />
        </Show>
      </div>
      {/* <For each={kana}>{(info) => <div>{info[mode()]}</div>}</For> */}
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
            fontSize: "9xl",
            fontWeight: "black",
            textAlign: "center",
            width: 48,
            height: 48,
            borderWidth: 1,
            borderRadius: "md",
            animation: "slideLeft 500ms forwards",
          })}
        >
          {props.kana[props.index - 1][props.mode]}
        </div>
      </Show>
      <div
        class={css({
          position: "absolute",
          fontSize: "9xl",
          fontWeight: "black",
          textAlign: "center",
          width: 48,
          height: 48,
          borderWidth: 1,
          borderRadius: "md",
          animation: "slideFromRight 500ms",
        })}
      >
        {props.kana[props.index][props.mode]}
      </div>
    </>
  );
}
