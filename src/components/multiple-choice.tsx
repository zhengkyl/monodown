import { For, createSignal } from "solid-js";
import { Button } from "./ui/Button";
import { randomNChoices } from "~/util/arrays";
import { Dynamic } from "solid-js/web";

type TextWidget = {
  id: string;
  text: string;
  audio: string;
};

type MCProps = {
  question: (TextWidget | string)[];
  choices: TextWidget[];
  answer: string;
  selected: string | null;
  setSelected: (data) => void;
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

  function handleAnswer() {
    console.log(selected());
    if (selected() === answer.id) {
      setStatus(STATUS.RIGHT);
    } else {
      setStatus(STATUS.WRONG);
    }
  }

  const buttons = {
    [STATUS.UNANSWERED]: () => (
      <Button
        size="sm"
        class="btn-fill-green float-right w-full"
        disabled={selected() == null}
        onClick={handleAnswer}
      >
        Check
      </Button>
    ),
    [STATUS.RIGHT]: () => (
      <Button
        size="sm"
        class="btn-fill-green float-right w-full"
        disabled={selected() == null}
      >
        Continue
      </Button>
    ),
    [STATUS.WRONG]: () => (
      <Button
        size="sm"
        class="btn-fill-red float-right w-full"
        disabled={selected() == null}
      >
        Got it
      </Button>
    ),
  };

  return (
    <div class="max-w-screen-sm m-auto p-4">
      <MCGrid
        status={status()}
        question={question}
        answer={answer.id}
        choices={choices()}
        selected={selected()}
        setSelected={(d) => {
          console.log("set", d);
          setSelected(d);
        }}
      />
      <div class="mt-16">
        <Dynamic component={buttons[status()]} />
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
              onClick={[props.setSelected, choice.id]}
              size="lg"
              class="btn-line-indigo"
              classList={{
                "btn-line-indigo-active":
                  props.status === STATUS.UNANSWERED &&
                  choice.id === props.selected,
                "btn-line-red-active":
                  props.status === STATUS.WRONG && choice.id === props.selected,
                "btn-line-green-active":
                  props.status !== STATUS.UNANSWERED &&
                  choice.id === props.answer,
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
