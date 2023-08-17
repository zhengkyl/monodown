import { Button } from "~/components/ui/Button";
import { signIn, signOut } from "@auth/solid-start/client";
import { createServerData$ } from "solid-start/server";
import MultipleChoice from "~/components/MultipleChoice";
import { randomNChoices } from "~/util/arrays";
import { useRouteData } from "solid-start";
import { For, Suspense } from "solid-js";

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
    (key) => [
      {
        question,
        answerId: answer.id,
        choices: randomNChoices(answer, wrongs, 4),
        layout: "grid" as const,
      },
      {
        question,
        answerId: answer.id,
        choices: randomNChoices(answer, wrongs, 4),
        layout: "col" as const,
      },
      {
        question,
        answerId: answer.id,
        choices: randomNChoices(answer, wrongs, 3),
        layout: "row" as const,
      },
    ],
    { key: () => [] }
  );
}

export default function Home() {
  const questions = useRouteData<typeof routeData>();

  return (
    <main>
      <Button class="btn-fill-cyan" onClick={[signIn, "github"]}>
        Sign In
      </Button>
      <Button class="btn-fill-purple" onClick={signOut}>
        Sign Out
      </Button>
      <For each={questions()} fallback={<p>Loading...</p>}>
        {(question) => <MultipleChoice {...question} />}
      </For>
    </main>
  );
}
