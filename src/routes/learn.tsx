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
import { Button } from "~/components/ui/Button";

export default function Learn() {
  const [index, setIndex] = createSignal(0);
  return (
    <main class="flex flex-wrap gap-4">
      <Door index={0} />
      <Door index={1} />
      <Door index={2} />
      <Door index={3} />
      <Door index={4} />
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
    <div class="flex flex-col items-center max-w-sm p-4 border-2 border-border rounded-lg">
      <Dynamic
        ref={svg}
        component={lesson[props.index].svg}
        class="max-w-xs [&_g:first-of-type]:fill-stone-300 [&_g:last-of-type]:stroke-stone-800"
      />
      <div class="font-bold text-4xl mb-4 text-indigo-900">
        {lesson[props.index].text}
      </div>
      <div class="flex gap-4">
        <Button
          onClick={() => {
            const audio = new Audio(lesson[props.index].audio);
            audio.play();
          }}
          size="icon-lg"
        >
          <div class="i-uil:volume"></div>
        </Button>
        <Button
          onClick={() => {
            animator()?.animatePath(true);
          }}
          size="icon-lg"
        >
          <div class="i-uil:pen"></div>
        </Button>
      </div>
      {/* <Textfield class="m-auto w-[80px]" /> */}
    </div>
  );
}
