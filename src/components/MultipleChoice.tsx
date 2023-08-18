import { For, Show, createSignal } from "solid-js";
import { Button } from "./ui/Button";
import { Button as KButton } from "@kobalte/core";
import { SharedProps } from "./Quiz";

type TextWidget = {
  id: string;
  text: string;
  audio?: string;
  image?: string;
};

type Text = {
  text: string;
  annotation: string;
};

type Layout = "grid" | "row" | "col";
type Status = "UNANSWERED" | "RIGHT" | "WRONG";

export type MultipleChoiceProps = {
  layout: Layout;
  question: (string | TextWidget)[];
  choices: TextWidget[];
  answerId: string;
};

export default function MultipleChoice(
  props: MultipleChoiceProps & SharedProps
) {
  const [selected, setSelected] = createSignal(null);

  const [status, setStatus] = createSignal<Status>("UNANSWERED");

  const setSel = (id) => {
    // alert("pointer set selc");
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
        <For each={props.question}>
          {(section) =>
            typeof section === "string" ? (
              section
            ) : (
              <span class="underline">{section.text}</span>
            )
          }
        </For>
      </div>
      <div class={`gap-4 mb-8 ${LayoutClass[props.layout]}`}>
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
              <Show when={props.layout !== "col"} fallback={choice.text}>
                <div class="flex flex-col gap-3 h-full justify-end">
                  <img src={choice.image} class="max-h-24 object-cover" />
                  <p>{choice.text}</p>
                </div>
              </Show>
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

const LayoutClass: { [key in Layout]: string } = {
  grid: "grid grid-cols-2",
  row: "flex [&>*]:flex-1",
  col: "flex flex-col",
};
