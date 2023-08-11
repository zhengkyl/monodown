import { For } from "solid-js";
import { Button } from "./ui/Button";
import { randomNChoices } from "~/util/arrays";

type TextWidget = {
  text: string;
  audio: string;
};

type MCProps = {
  question: (TextWidget | string)[];
  answer: TextWidget;
  wrongs: TextWidget[];
};

export function MCGrid(props: MCProps) {
  const choices = randomNChoices(props.answer, props.wrongs, 4);

  function handleOption(data) {
    // console.log(data);
  }

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
        <For each={choices}>
          {(option, i) => (
            <Button
              onClick={[handleOption, option]}
              size="lg"
              variant="outline"
            >
              {option.text}
            </Button>
          )}
        </For>
      </div>
    </>
  );
}
