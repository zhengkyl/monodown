import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { makeDraggable } from "../util/makeDraggable";
makeDraggable; // preserve import b/c ts strips unused

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      makeDraggable;
    }
  }
}

type Props = {
  svg: SVGSVGElement;
};

export function Irises(props: Props) {
  const irises = [];
  irises.push(
    props.svg.querySelector(
      '[data-label="eye_left"] > [data-label="ball"]> [data-label="iris"]'
    )
  );
  irises.push(
    props.svg.querySelector(
      '[data-label="eye_right"] > [data-label="ball"]> [data-label="iris"]'
    )
  );

  let dot: HTMLDivElement;
  let thetaSlider: HTMLInputElement;
  let rSlider: HTMLInputElement;

  const [transforms, setTransforms] = createStore({
    irises: {
      r: 0,
      theta: 0,
    },
  });

  createEffect(() => {
    const x = transforms.irises.r * Math.cos(transforms.irises.theta);
    const y = transforms.irises.r * Math.sin(transforms.irises.theta);
    if (irises) {
      irises.forEach((element) => {
        element.setAttribute("transform", `translate(${x * 10}, ${y * 10})`);
      });
    }
    dot.style.translate = `${x * 80}px ${y * 80}px`;
  });

  return (
    <div>
      <div>
        <input
          ref={thetaSlider}
          type="range"
          id="theta"
          name="Theta"
          value="0"
          min="-180"
          max="180"
          onInput={(e) => {
            const theta = (Math.PI * parseInt(e.target.value)) / 180;
            setTransforms("irises", "theta", theta);
          }}
        />
        <label for="theta">Theta</label>
      </div>
      <div>
        <input
          ref={rSlider}
          type="range"
          id="r"
          name="Radius"
          value="0"
          min="0"
          max="1"
          step="0.01"
          onInput={(e) => {
            const r = parseFloat(e.target.value);
            setTransforms("irises", "r", r);
          }}
        />
        <label for="r">Radius</label>
      </div>
      <div class="rounded-full h-[160px] w-[160px] bg-stone-200 flex justify-center items-center">
        <div
          ref={dot}
          class="rounded-full bg-red-400 h-8 w-8 cursor-grab"
          use:makeDraggable={{
            onMove: (dx, dy) => {
              const theta = Math.atan2(dy, dx);
              const r = Math.min(Math.sqrt(dx ** 2 + dy ** 2), 80) / 80;
              thetaSlider.value = ((theta / Math.PI) * 180).toString();
              rSlider.value = r.toString();
              setTransforms("irises", {
                r,
                theta,
              });
            },
          }}
        ></div>
      </div>
    </div>
  );
}
