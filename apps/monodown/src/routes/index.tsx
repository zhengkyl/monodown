import { For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import FreeResponse from "~/components/FreeResponse/FreeResponse";
import { Prompt } from "~/components/MultipleChoice/format";
import { Question, Quiz } from "~/components/Quiz";
import { Button } from "~/components/ui/Button";
import { Button2 } from "~/components/ui/Button2";
import { randomNChoices } from "~/util/arrays";
import EarthSVG from "../assets/svg/earth.min.svg";

const prompt = {
  type: "text",
  text: "What does ok mean?",
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
    <main class="bg-slate-900 flex-1 max-w-sm m-auto">
      <div class="overflow-auto">
        {/* <Button size="icon-lg" class="rounded-full">
          <div class="i-uil:map">
          </div>
        </Button> */}
        <Button2>
          <div class="i-uil:cell"></div>
        </Button2>
        <Button2>
          <div class="i-uil:clipboard-notes"></div>
        </Button2>
        <Button2>
          <div class="i-uil:rocket"></div>
        </Button2>
        <Button2>
          <div class="i-uil:bolt-alt"></div>
        </Button2>
        <Dungeon junctions={testJunctions} />
        <EarthSVG />
        {/* <Show when={questions() != null}>
          <Quiz questions={questions()} />
        </Show>
        <FreeResponse /> */}
      </div>
    </main>
  );
}

type DungeonProps = {
  junctions: JunctionProps[];
};

const testJunctions = [
  {
    title: "Welcome",
    rooms: [{ type: "info" }],
  },
  {
    title: "Welcome",
    rooms: [{ type: "info" }, { type: "quiz" }, { type: "sort" }],
  },
  {
    title: "Two",
    rooms: [{ type: "quiz" }, { type: "sort" }],
  },
];

function Dungeon(props: DungeonProps) {
  return (
    <For each={props.junctions}>
      {(junction) => <DungeonJunction {...junction} />}
    </For>
  );
}

type JunctionProps = {
  title: string;
  rooms: { type: "info" | "sort" | "quiz" }[];
};

const RoomByType = {
  info: () => (
    <Button2>
      <div class="i-uil:clipboard-notes"></div>
    </Button2>
  ),
  sort: () => (
    <Button2 class="rounded-full">
      <div class="i-uil:rocket"></div>
    </Button2>
  ),
  quiz: () => (
    <Button2 class="rounded-full border-amber text-amber">
      <div class="i-uil:bolt-alt"></div>
    </Button2>
  ),
};

function DungeonJunction(props: JunctionProps) {
  return (
    <div class="border rounded-xl p-4 m-4 flex justify-center gap-6">
      <For each={props.rooms}>
        {(room) => <Dynamic component={RoomByType[room.type]} />}
      </For>
    </div>
  );
}
