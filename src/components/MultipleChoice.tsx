import { For, Show, createSignal } from "solid-js";
import { Button } from "./ui/Button";
import { randomNChoices } from "~/util/arrays";

type TextWidget = {
  id: string;
  text: string;
  audio: string;
};

type MCProps = {
  question: (TextWidget | string)[];
  choices: TextWidget[];
  selected: string | null;
  setSelected: (id: string) => void;
  status: STATUS;
};

enum STATUS {
  UNANSWERED,
  RIGHT,
  WRONG,
}

export default function MC(props) {
  const question = [
    "What does ",
    { text: "ok", audio: "", id: "ok" },
    " mean?",
  ];
  const answer = { text: "ok", audio: "", id: "ok" };
  const wrongs = [
    {
      text: "red",
      audio: "",
      id: "red",
    },
    {
      text: "blue",
      audio: "",
      id: "blue",
    },
    {
      text: "green",
      audio: "",
      id: "green",
    },
    {
      text: "yellow",
      audio: "",
      id: "yellow",
    },
  ];

  // TODO get question/choices from endpoint preshuffled, otherwise SSR + browser random different
  const [choices, setChoices] = createSignal(randomNChoices(answer, wrongs, 4));

  const [selected, setSelected] = createSignal(null);

  const [status, setStatus] = createSignal(STATUS.UNANSWERED);

  return (
    <div class="max-w-screen-sm m-auto p-4">
      <MCGrid
        status={status()}
        question={question}
        choices={choices()}
        selected={selected()}
        setSelected={(id) => {
          if (id === selected()) return;
          if (status() === STATUS.RIGHT) return;

          if (status() === STATUS.WRONG) {
            setStatus(STATUS.UNANSWERED);
          }
          setSelected(id);
        }}
      />
      <div class="mt-16">
        <Show
          when={status() === STATUS.RIGHT}
          fallback={
            <Button
              size="sm"
              class="btn-fill-indigo float-right w-full"
              disabled={selected() == null || status() === STATUS.WRONG}
              onClick={() =>
                setStatus(
                  selected() === answer.id ? STATUS.RIGHT : STATUS.WRONG
                )
              }
            >
              Check
            </Button>
          }
        >
          <Button size="sm" class="btn-fill-green float-right w-full">
            Continue
          </Button>
        </Show>
      </div>
    </div>
  );
}

const GridButtonColors = {
  [STATUS.UNANSWERED]: "btn-line-indigo-active",
  [STATUS.RIGHT]: "btn-line-green-active btn-line-green",
  [STATUS.WRONG]: "btn-line-red-active btn-line-red",
};

function MCGrid(props: MCProps) {
  return (
    <>
      <div class="text-2xl font-semibold m-y-16">
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
      <div class="grid grid-cols-2 gap-4">
        <For each={props.choices}>
          {(choice) => (
            <Button
              onClick={[props.setSelected, choice.id]}
              size="lg"
              classList={{
                "btn-line-indigo":
                  props.status === STATUS.UNANSWERED ||
                  choice.id !== props.selected,
                [GridButtonColors[props.status]]: choice.id === props.selected,
              }}
            >
              {choice.text}
            </Button>
          )}
        </For>
      </div>
    </>
  );
}
