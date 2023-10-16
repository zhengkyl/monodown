import { For, Show, createSignal, onMount, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import FreeResponse from "~/components/FreeResponse/FreeResponse";
import { Prompt } from "~/components/MultipleChoice/format";
import { Question, Quiz } from "~/components/Quiz";
import { Button } from "~/components/ui/Button";
import { Button2 } from "~/components/ui/Button2";
import { randomNChoices } from "~/util/arrays";
import EarthSVG from "../../assets/svg/earth.min.svg";
import { Planet } from "~/components/Planet";
import { Trail } from "~/components/Trail";

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

export default function Dungeon() {
  const questions = useRouteData<typeof routeData>();

  let trail: SVGSVGElement;
  let scrollCont;
  const [pos, setPos] = createSignal([]);

  onMount(() => {
    const group = trail.querySelector('[data-label="points"]');
    const tmp = [];

    const scl = scrollCont.getBoundingClientRect().left;
    for (const child of group.children) {
      const rect = child.getBoundingClientRect();
      tmp.push({ y: rect.top + scrollCont.scrollTop, x: rect.left - scl });
    }
    tmp.sort((a, b) => b.y - a.y);
    setPos(tmp);
    group.classList.add("hidden");
  });

  return (
    <main class="bg-slate-900 flex-1 max-w-sm m-auto">
      <div ref={scrollCont} class="h-screen overflow-auto relative">
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
        <Trail class="w-sm stroke-white" ref={trail} />
        <Show when={pos().length > 0} fallback={<div>what is going on</div>}>
          <DungeonPath junctions={junctions} pos={pos()} />
        </Show>
        <Planet />
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
  pos: { x: number; y: number }[];
};
const junctions = Array(16)
  .fill(null)
  .map((_, i) => {
    if (i === 0 || i === 4 || i === 7) {
      return {
        title: "Welcome",
        type: "info" as const,
      };
    }

    if (i % 2) {
      return {
        title: "Welcome",
        type: "quiz" as const,
      };
    }
    return {
      title: "Two",
      type: "sort" as const,
    };
  });
// console.log(junctions);

function DungeonPath(props: DungeonProps) {
  return (
    <For each={props.junctions}>
      {(junction, i) => (
        <DungeonJunction
          {...junction}
          class="absolute"
          style={`top:${props.pos[i()].y}px;left:${props.pos[i()].x}px`}
        />
      )}
    </For>
  );
}

type JunctionProps = {
  title: string;
  type: "info" | "sort" | "quiz";
};

const RoomByType = {
  info: (props) => (
    <Button size="icon" variant="fill" hue="green" depth={5} {...props}>
      <div class="i-uil:clipboard-notes"></div>
    </Button>
  ),
  sort: (props) => (
    <Button
      class="rounded-full"
      size="icon"
      variant="fill"
      hue="red"
      depth={5}
      {...props}
    >
      <div class="i-uil:rocket"></div>
    </Button>
  ),
  quiz: (props) => (
    <Button
      class="rounded-full"
      size="icon"
      variant="fill"
      hue="yellow"
      depth={5}
      {...props}
    >
      <div class="i-uil:bolt-alt"></div>
    </Button>
  ),
};

function DungeonJunction(props: JunctionProps) {
  const [, rest] = splitProps(props, ["type", "title"]);
  return <Dynamic component={RoomByType[props.type]} {...rest} />;
}
