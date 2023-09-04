import { createSignal, onMount } from "solid-js";
import { Button } from "~/components/ui/Button";
import { StrokeAnimator } from "~/util/strokeAnimator";

export default function Test() {
  let svg: SVGSVGElement;

  const [animator, setAnimator] = createSignal<StrokeAnimator>();

  onMount(() => {
    setAnimator(new StrokeAnimator(svg));
  });

  return (
    <div>
      <Button onClick={() => animator()?.animatePath()}>Animate</Button>
      <p>
        For svg and stroke info KanjiVG{" "}
        <a href="http://kanjivg.tagaini.net">http://kanjivg.tagaini.net</a>
        License: Creative Commons Attribution-Share Alike 3.0
      </p>
      <svg
        ref={svg}
        xmlns="http://www.w3.org/2000/svg"
        width="109"
        height="109"
        viewBox="0 0 109 109"
      >
        <g
          id="kvg:StrokePaths_03041"
          style="fill:none;stroke:#000000;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;"
        >
          <g id="kvg:03041" {...{ ["kvg:element"]: "ぁ" }}>
            <path
              id="kvg:03041-s1"
              d="M35.72,46.75c0.7,0.7,2.21,1.47,4.22,1.4c8.56-0.28,16.06-1.7,23.69-3.41c1.21-0.27,3.72-0.7,5.32-0.4"
            />
            <path
              id="kvg:03041-s2"
              d="M51.03,34.43c0.7,0.8,1.21,2.87,0.85,4.46c-3.01,13.43-5.02,30.31-4.12,42.73c0.33,4.57,1.51,8.72,2.71,10.92"
            />
            <path
              id="kvg:03041-s3"
              d="M63.53,55.67c0.6,0.9,0.93,3.52,0.4,4.91c-3.71,9.82-9.04,19.04-20.38,28.66c-5.51,4.67-12.75,3-13.05-6.71c-0.27-8.72,10.74-18.54,26-21.44c9.97-1.9,21.75,1.67,24.5,10.22c3.39,10.53-3.01,21.14-16.77,24.45"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
