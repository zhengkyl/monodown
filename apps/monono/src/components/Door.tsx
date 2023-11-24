import { createSignal, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import ASvg from "~/assets/kana/あ.svg";
import MASvg from "~/assets/kana/mあ.svg";
import ISvg from "~/assets/kana/い.svg";
import USvg from "~/assets/kana/う.svg";
import ESvg from "~/assets/kana/え.svg";
import OSvg from "~/assets/kana/お.svg";
import AAudio from "~/assets/audio/a.mp3";
import IAudio from "~/assets/audio/i.mp3";
import UAudio from "~/assets/audio/u.mp3";
import EAudio from "~/assets/audio/e.mp3";
import OAudio from "~/assets/audio/o.mp3";
import { strokeAnimator } from "~/util/strokeAnimator";
import { ThickButton } from "~/components/ui/ThickButton";

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
// const classes = [
//   "bg-red-300",
//   "bg-green-300",
//   "bg-blue-300",
//   "bg-yellow-200",
//   "bg-orange-300",
// ];

export function Door(props) {
  let svg: SVGSVGElement;

  const [animator, setAnimator] =
    createSignal<ReturnType<typeof strokeAnimator>>();

  onMount(() => {
    setAnimator(strokeAnimator(svg));
  });

  return (
    <div class="flex flex-col gap-4">
      <div class="flex">
        <Dynamic
          ref={svg}
          component={lesson[props.index].svg}
          class="w-full border dark:([--stroke:#ccc] [--shadow:#000])"
        />
        <MASvg class="w-full border" />
      </div>
      <div class="flex gap-2 items-end">
        <ThickButton
          size="icon-lg"
          onClick={() => {
            const audio = new Audio(lesson[props.index].audio);
            audio.play();
          }}
        >
          <div class="i-uil:volume"></div>
        </ThickButton>
        <ThickButton
          onClick={() => {
            animator()?.play();
          }}
          size="icon"
        >
          <div class="i-uil:pen"></div>
        </ThickButton>
      </div>
    </div>
  );
}
