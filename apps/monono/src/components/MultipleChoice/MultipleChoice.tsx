import { For, Show, createSignal } from "solid-js";
import { ThickButton } from "../ui/Button";
import { SharedProps } from "../Quiz";
import { Choice, Prompt } from "./format";

type Format = "grid" | "row" | "col";
type Status = "UNANSWERED" | "RIGHT" | "WRONG";

export type MultipleChoiceProps = {
  format: Format;
  prompt: Prompt;
  choices: Choice[];
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
            <ThickButton
              onClick={() => setSel(choice.id)}
              class="px-5 py-5"
              hue={choice.id === selected() ? SelectedHue[status()] : "default"}
              // classList={{ "text-dark": choice.id !== selected() }}
            >
              {/* TODO */}
              {choice.text}
            </ThickButton>
          )}
        </For>
      </div>
      <div class="m-y-8">
        <Show
          when={status() === "RIGHT"}
          fallback={
            <ThickButton
              size="sm"
              variant="fill"
              hue="indigo"
              class="float-right w-full"
              disabled={selected() == null || status() === "WRONG"}
              onClick={() =>
                setStatus(selected() === props.answerId ? "RIGHT" : "WRONG")
              }
            >
              Check
            </ThickButton>
          }
        >
          <ThickButton
            size="sm"
            variant="fill"
            hue="green"
            class="float-right w-full"
            onClick={props.onContinue}
          >
            Continue
          </ThickButton>
        </Show>
      </div>
    </div>
  );
}

const SelectedHue: { [key in Status]: "indigo" | "green" | "red" } = {
  UNANSWERED: "indigo",
  RIGHT: "green",
  WRONG: "red",
};

const LayoutClass: { [key in Format]: string } = {
  grid: "grid grid-cols-2",
  row: "flex [&>*]:flex-1",
  col: "flex flex-col",
};
