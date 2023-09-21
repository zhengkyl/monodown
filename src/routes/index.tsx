import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Prompt } from "~/components/MultipleChoice/format";
import { Question, Quiz } from "~/components/Quiz";
import { randomNChoices } from "~/util/arrays";

const prompt = {
  type: "text",
  text: "What does ok mean?",
  // audio: "",
  // image: "",
} satisfies Prompt;

const answer = { text: "ok", audio: "", id: "ok", image: "person.jpg" };
const wrongs = [
  {
    text: "red",
    audio: "",
    id: "red",
    image: "car.jpg",
  },
  {
    text: "blue",
    audio: "",
    id: "blue",
    image: "house.jpg",
  },
  {
    text: "green",
    audio: "",
    id: "green",
    image: "moon.jpg",
  },
  {
    text: "yellow",
    audio: "",
    id: "yellow",
    image: "person.jpg",
  },
];

export function routeData(params) {
  return createServerData$(
    (key) =>
      [
        {
          type: "MultipleChoice",
          props: {
            prompt: prompt,
            answerId: answer.id,
            choices: randomNChoices(answer, wrongs, 4),
            format: "grid",
          },
        },
        {
          type: "MultipleChoice",
          props: {
            prompt: prompt,
            answerId: answer.id,
            choices: randomNChoices(answer, wrongs, 4),
            format: "col",
          },
        },
        {
          type: "MultipleChoice",
          props: {
            prompt: prompt,
            answerId: answer.id,
            choices: randomNChoices(answer, wrongs, 3),
            format: "row",
          },
        },
      ] satisfies Question[],
    { key: () => [] }
  );
}

export default function Home() {
  const questions = useRouteData<typeof routeData>();

  return (
    <main class="flex-1">
      <Show when={questions() != null}>
        <Quiz questions={questions()} />
      </Show>
    </main>
  );
}
