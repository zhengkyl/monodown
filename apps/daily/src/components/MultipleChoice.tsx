// client only, idk how else to specify

import { createSignal, For, Show } from "solid-js";
import { css } from "styled-system/css";
import { Button } from "./ui/Button";

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const test = [
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

export const questions: MultipleChoiceQuestion[] = test.concat(test);

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
  // onContinue: () => void;
  answer: MultipleChoiceQuestion["answer"];
  setAnswer: (selected: MultipleChoiceQuestion["answer"]) => void;
}) {
  const choices = [...props.question.decoys, props.question.answer];
  shuffleArray(choices);

  // const [selected, setSelected] = createSignal(null);

  const onSubmit = () => {
    // if (answers[selected()] === props.question.answer) {
    //   setResult(Result.SUCCESS);
    // } else {
    //   setResult(Result.FAILURE);
    // }
  };

  return (
    <div>
      <p class={css({ fontSize: "4xl", fontWeight: "bold" })}>
        {props.question.prompt}
      </p>
      <div class={css({ display: "flex", flexDir: "column", gap: 2, my: 4 })}>
        <For each={choices}>
          {(choice, i) => (
            <Button
              variant={props.answer === choice ? "solid" : "outline"}
              colorPalette="indigo"
              size="2xl"
              borderRadius="lg"
              onClick={[props.setAnswer, choice]}
            >
              {choice}
            </Button>
          )}
        </For>
      </div>
    </div>
  );
}
