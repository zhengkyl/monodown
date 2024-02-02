// client only, idk how else to specify

import { createSignal, For, Show } from "solid-js";
import { css } from "styled-system/css";
import { Button } from "./ui/Button";
import { flex } from "styled-system/patterns";

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const questions: MultipleChoiceQuestion[] = [
  {
    directions: "Choose the correct meaning.",
    promptType: "text",
    prompt: "元気だ",
    answerType: "text",
    answer: "(I) am well",
    decoys: ["(I) am not well", "(I) was well", "(I) was not well"],
  },
  {
    directions: "Choose the correct meaning.",
    promptType: "text",
    prompt: "元気じゃない",
    answerType: "text",
    answer: "(I) am not well",
    decoys: ["(I) am well", "(I) was well", "(I) was not well"],
  },
  {
    directions: "Choose the correct meaning.",
    promptType: "text",
    prompt: "元気だった",
    answerType: "text",
    answer: "(I) was well",
    decoys: ["(I) am well", "(I) am not well", "(I) was not well"],
  },
  {
    directions: "Choose the correct meaning.",
    promptType: "text",
    prompt: "元気じゃなかった",
    answerType: "text",
    answer: "(I) was not well",
    decoys: ["(I) am well", "(I) am not well", "(I) was well"],
  },
];
enum Result {
  IN_PROGRESS,
  FAILURE,
  SUCCESS,
}
type MultipleChoiceQuestion = {
  directions?: string;
  promptType: "text" | "sound" | "image";
  prompt: string;
  answerType: "text" | "sound" | "image";
  answer: string;
  decoys: string[];
};
export function MultipleChoice(props: {
  question: MultipleChoiceQuestion;
  onContinue: () => void;
}) {
  const answers = [...props.question.decoys, props.question.answer];
  shuffleArray(answers);

  const [selected, setSelected] = createSignal(null);

  const onSubmit = () => {
    if (answers[selected()] === props.question.answer) {
      setResult(Result.SUCCESS);
    } else {
      setResult(Result.FAILURE);
    }
  };

  const [result, setResult] = createSignal(Result.IN_PROGRESS);

  return (
    <div
      class={css({
        display: "flex",
        flexDir: "column",
        justifyContent: "space-between",
        height: "100%",
        px: 4,
        py: 16,
      })}
    >
      <div>
        <p class={css({ fontSize: "4xl", fontWeight: "bold" })}>
          {props.question.prompt}
        </p>
        <div class={css({ display: "flex", flexDir: "column", gap: 2, my: 4 })}>
          <For each={answers}>
            {(answer, i) => (
              <Button
                variant={selected() === i() ? "solid" : "outline"}
                colorPalette="plum"
                size="2xl"
                borderRadius="lg"
                onClick={[setSelected, i()]}
              >
                {answer}
              </Button>
            )}
          </For>
        </div>
      </div>
      <Show
        when={result() === Result.IN_PROGRESS}
        fallback={
          <>
            <Button
              colorPalette={result() === Result.SUCCESS ? "green" : "red"}
              size="xl"
              width="full"
              onClick={props.onContinue}
              zIndex={10}
            >
              Continue
            </Button>
          </>
        }
      >
        <Button colorPalette="green" size="xl" width="full" onClick={onSubmit}>
          Submit
        </Button>
      </Show>
      <div
        class={css({
          transition: "translate 300ms",
          translate: result() === Result.IN_PROGRESS ? "0 100%" : "0",
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          background: "accent.5",
          px: 4,
          pt: 8,
          pb: 32,
        })}
      >
        <div class={css({ fontSize: "xl", fontWeight: "bold" })}>
          {result() === Result.FAILURE ? "Oops!" : "Good job!"}
        </div>
        <p class={css({ fontWeight: "medium" })}>{props.question.answer}</p>
      </div>
    </div>
  );
}
