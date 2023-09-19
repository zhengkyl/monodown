import { createSignal, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import ASvg from "~/assets/kana/あ.svg";
import ISvg from "~/assets/kana/い.svg";
import USvg from "~/assets/kana/う.svg";
import ESvg from "~/assets/kana/え.svg";
import OSvg from "~/assets/kana/お.svg";
import AAudio from "~/assets/audio/a.mp3";
import IAudio from "~/assets/audio/i.mp3";
import UAudio from "~/assets/audio/u.mp3";
import EAudio from "~/assets/audio/e.mp3";
import OAudio from "~/assets/audio/o.mp3";
import { Textfield } from "~/components/ui/Textfield";
import { StrokeAnimator } from "~/util/strokeAnimator";

export default function Learn() {
  const [index, setIndex] = createSignal(0);
  return (
    <main class="h-full relative">
      <div class="overflow-x-auto h-full">
        <div class="flex w-[500%] h-full">
          <Door index={0} />
          <Door index={1} />
          <Door index={2} />
          <Door index={3} />
          <Door index={4} />
        </div>
      </div>
      <div class="absolute top-[50%] w-full">
        <Textfield class="m-auto w-[80px]" />
      </div>
    </main>
  );
}

const lesson = [
  {
    svg: ASvg,
    audio: AAudio,
    text: "a",
  },
  {
    svg: ISvg,
    audio: IAudio,
    text: "i",
  },
  {
    svg: USvg,
    audio: UAudio,
    text: "u",
  },
  {
    svg: ESvg,
    audio: EAudio,
    text: "e",
  },
  {
    svg: OSvg,
    audio: OAudio,
    text: "o",
  },
];
const classes = [
  "bg-red-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-yellow-200",
  "bg-orange-300",
];

function Door(props) {
  let svg: SVGSVGElement;

  const [animator, setAnimator] = createSignal<StrokeAnimator>();

  onMount(() => {
    setAnimator(new StrokeAnimator(svg));
  });

  return (
    <div
      class="w-screen flex flex-col items-center"
      classList={{ [classes[props.index]]: true }}
    >
      <Dynamic
        ref={svg}
        component={lesson[props.index].svg}
        class="w-[50%] ![&_g:first-of-type]:fill-stone-900 ![&_g:last-of-type]:stroke-stone-100"
        onClick={() => {
          const audio = new Audio(lesson[props.index].audio);
          audio.play();

          animator()?.animatePath(true);
        }}
      />
      <div>{lesson[props.index].text}</div>
    </div>
  );
}
