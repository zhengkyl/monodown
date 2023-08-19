import { For, Match, Show, createSignal } from "solid-js";
import { Button } from "../ui/Button";
import { Button as KButton } from "@kobalte/core";
import { SharedProps } from "../Quiz";
import {
  AudioPrompt,
  ImageChoice,
  ImagePrompt,
  TextChoice,
  TextPrompt,
} from "./format";

type Format = "grid" | "row" | "col";
type Status = "UNANSWERED" | "RIGHT" | "WRONG";

export type MultipleChoiceProps =
  | {
      format: "grid";
      prompt: TextPrompt;
      choices: (TextChoice | ImageChoice)[];
      answerId: string;
    }
  | {
      format: "row";
      prompt: TextPrompt | AudioPrompt | ImagePrompt;
      choices: (TextChoice | ImageChoice)[];
      answerId: string;
    }
  | {
      format: "col";
      prompt: TextPrompt;
      choices: TextChoice[];
      answerId: string;
    };

export default function MultipleChoice(
  props: MultipleChoiceProps & SharedProps
) {
  const [selected, setSelected] = createSignal(null);

  const [status, setStatus] = createSignal<Status>("UNANSWERED");

  const setSel = (id) => {
    if (id === selected()) return;
    if (status() === "RIGHT") return;

    if (status() === "WRONG") {
      setStatus("UNANSWERED");
    }
    setSelected(id);
  };

  return (
    <div class="max-w-screen-sm m-auto p-4 h-full flex flex-col justify-between">
      <div class="text-2xl font-semibold m-y-8">
        {/* TODO */}
        {props.prompt.text}
      </div>
      <div class={`gap-4 mb-8 ${LayoutClass[props.format]}`}>
        <For each={props.choices}>
          {(choice) => (
            <KButton.Root
              onPointerDown={[setSel, choice.id]}
              class="px-5 py-5"
              classList={{
                "btn-line-indigo": choice.id !== selected(),
                [SelectedClass[status()]]: choice.id === selected(),
              }}
            >
              {/* TODO */}
              {choice.text}
            </KButton.Root>
          )}
        </For>
      </div>
      <div class="m-y-8">
        <Show
          when={status() === "RIGHT"}
          fallback={
            <Button
              size="sm"
              class="btn-fill-indigo float-right w-full"
              disabled={selected() == null || status() === "WRONG"}
              onClick={() =>
                setStatus(selected() === props.answerId ? "RIGHT" : "WRONG")
              }
            >
              Check
            </Button>
          }
        >
          <Button
            size="sm"
            class="btn-fill-green float-right w-full"
            onClick={props.onContinue}
          >
            Continue
          </Button>
        </Show>
      </div>
    </div>
  );
}

const SelectedClass: { [key in Status]: string } = {
  UNANSWERED: "btn-line-indigo btn-line-indigo-active",
  RIGHT: "btn-line-green btn-line-green-active",
  WRONG: "btn-line-red btn-line-red-active",
};

const LayoutClass: { [key in Format]: string } = {
  grid: "grid grid-cols-2",
  row: "flex [&>*]:flex-1",
  col: "flex flex-col",
};
