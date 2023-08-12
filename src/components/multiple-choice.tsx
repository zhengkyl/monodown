import { For, createSignal } from "solid-js";
import { Button } from "./ui/Button";
import { randomNChoices } from "~/util/arrays";

type TextWidget = {
  text: string;
  audio: string;
};

type MCProps = {
  question: (TextWidget | string)[];
  choices: TextWidget[];
  selected: TextWidget | null;
  setSelected: (data) => void;
};

type MCQuestion = {
  question: (TextWidget | string)[];
  answer: TextWidget;
  wrongs: TextWidget[];
};

const STATUS = {
  UNANSWERED: "UNANSWERED",
  RIGHT: "RIGHT",
  WRONG: "WRONG",
};

export function MC(props) {
  const question = ["What does ", { text: "ok", audio: "" }, " mean?"];
  const answer = { text: "ok", audio: "" };
  const wrongs = [
    {
      text: "red",
      audio: "",
    },
    {
      text: "blue",
      audio: "",
    },
    {
      text: "green",
      audio: "",
    },
    {
      text: "yellow",
      audio: "",
    },
  ];
  const choices = randomNChoices(answer, wrongs, 4);

  const [selected, setSelected] = createSignal(null);

  const [status, setStatus] = createSignal(STATUS.UNANSWERED);

  return (
    <div class="max-w-screen-sm m-auto p-4">
      <MCGrid
        question={question}
        choices={choices}
        selected={selected()}
        setSelected={setSelected}
      />
      <div class="mt-16">
        <Button
          size="sm"
          class="btn-fill-green float-right w-full"
          disabled={selected() == null}
        >
          Check
        </Button>
      </div>
    </div>
  );
}

function MCGrid(props: MCProps) {
  return (
    <>
      <div class="text-2xl font-semibold m-y-16">
        <For each={props.question}>
          {(section, i) =>
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
          {(choice, i) => (
            <Button
              onClick={[props.setSelected, choice]}
              size="lg"
              class="btn-line-indigo"
              classList={{
                "btn-line-indigo-active":
                  props.selected && choice.text === props.selected.text,
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
