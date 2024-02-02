import { Title } from "@solidjs/meta";
import {
  Blend,
  Columns2,
  Dice4,
  Dice5,
  Dice6,
  Dices,
  Rabbit,
  Redo,
  Scissors,
  ScissorsLineDashed,
  Ticket,
} from "lucide-solid";
import { For, createSignal } from "solid-js";
import { css } from "styled-system/css";
import { Calendar } from "~/components/Calendar";
import MenuButton from "~/components/MenuButton";
import { Button } from "~/components/ui/Button";
import * as Menu from "~/components/ui/Menu";

export default function Daily() {
  return (
    <main class={css({ p: 4 })}>
      <Title>Hello World</Title>
      <Button>Hello</Button>
      {/* <Calendar /> */}

      <div class={css({ maxWidth: "breakpoint-sm", mx: "auto" })}>
        <MultipleChoice question={questions[0]} />
      </div>
    </main>
  );
}

const questions: Question[] = [
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

type Question = {
  directions?: string;
  promptType: "text" | "sound" | "image";
  prompt: string;
  answerType: "text" | "sound" | "image";
  answer: string;
  decoys: string[];
};

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function MultipleChoice(props: { question: Question }) {
  const answers = [...props.question.decoys, props.question.answer];
  shuffleArray(answers);

  const [selected, setSelected] = createSignal(null);
  //skip, 50/50, reroll question
  return (
    <div class={css()}>
      <div class={css({ fontSize: "lg", fontWeight: "bold" })}>
        {props.question.directions}
      </div>
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
              onClick={[setSelected, i()]}
            >
              {answer}
            </Button>
          )}
        </For>
      </div>
      <div class={css({ display: "flex" })}>
        <MenuButton
          // size="xl"
          menuItems={
            <>
              <Menu.Item id="skip">
                <div
                  class={css({ display: "flex", gap: 2, alignItems: "center" })}
                >
                  <Rabbit />
                  Skip
                </div>
              </Menu.Item>
              <Menu.Item id="50/50">
                <div
                  class={css({ display: "flex", gap: 2, alignItems: "center" })}
                >
                  <Scissors />
                  50/50
                </div>
              </Menu.Item>
              <Menu.Item id="reroll">
                <div
                  class={css({ display: "flex", gap: 2, alignItems: "center" })}
                >
                  <Dice5 />
                  Reroll
                </div>
              </Menu.Item>
            </>
          }
        >
          Lifelines
        </MenuButton>
        <Button colorPalette="green" size="xl" width="full">
          Submit
        </Button>
      </div>
    </div>
  );
}
