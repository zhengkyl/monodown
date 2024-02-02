import { Show, createSignal } from "solid-js";
import { MultipleChoice, questions } from "~/components/MultipleChoice";
import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { css } from "styled-system/css";

export default function Quiz() {
  const [index, setIndex] = createSignal(0);

  const [show, setShow] = createSignal(true);
  const [parent] = createAutoAnimate();

  const onContinue = () => {
    setIndex((i) => i + 1);
    // Force unmount renderer to reset state
    setShow(false);
    setShow(true);
  };

  return (
    <div
      ref={parent}
      class={css({
        maxWidth: "breakpoint-sm",
        mx: "auto",
        height: "100svh",
        position: "relative",
        overflowY: "hidden",
      })}
    >
      <Show when={show() && index() < questions.length}>
        <MultipleChoice question={questions[index()]} onContinue={onContinue} />
      </Show>
    </div>
  );
}
