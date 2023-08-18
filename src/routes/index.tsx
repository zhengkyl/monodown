import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Question, Quiz } from "~/components/Quiz";
import { randomNChoices } from "~/util/arrays";

const question = ["What does ", { text: "ok", audio: "", id: "ok" }, " mean?"];
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
            question,
            answerId: answer.id,
            choices: randomNChoices(answer, wrongs, 4),
            layout: "grid",
          },
        },
        {
          type: "MultipleChoice",
          props: {
            question,
            answerId: answer.id,
            choices: randomNChoices(answer, wrongs, 4),
            layout: "col",
          },
        },
        {
          type: "MultipleChoice",
          props: {
            question,
            answerId: answer.id,
            choices: randomNChoices(answer, wrongs, 3),
            layout: "row",
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
