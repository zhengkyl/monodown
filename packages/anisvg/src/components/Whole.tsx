import { createEffect, createSignal } from "solid-js";

type Props = {
  svg: SVGSVGElement;
};

export function Whole(props: Props) {
  const [xRot, setXRot] = createSignal(0);
  const [yRot, setYRot] = createSignal(0);
  const [zRot, setZRot] = createSignal(0);

  const whole = props.svg.querySelector('[data-label="Whole"]');
  whole.style["transform-origin"] = "center";
  whole.style["transform"] = "rotateX(5deg)";

  createEffect(() => {
    console.log("her", whole.style.transform);
    whole.style.background = "red";
    whole.style.transform = `perspective(200px) translateY(20px) rotateX(${xRot()}deg) rotateY(${yRot()}deg) rotateZ(${zRot()}deg)`;
    console.log("her", whole.style.transform);
  });

  return (
    <div>
      <div>
        <input
          type="range"
          id="x_rot"
          name="X Rotation"
          value="0"
          min="-2"
          max="2"
          step="0.1"
          onInput={(e) => setXRot(parseFloat(e.target.value))}
        />
        <label for="x_rot">X Rot</label>
      </div>
      <div>
        <input
          type="range"
          id="y_rot"
          name="Y Rotation"
          value="0"
          min="-5"
          max="5"
          step="0.1"
          onInput={(e) => setYRot(parseFloat(e.target.value))}
        />
        <label for="y_rot">Y Rot</label>
      </div>
      <div>
        <input
          type="range"
          id="z_rot"
          name="Z Rotation"
          value="0"
          min="-2"
          max="2"
          step="0.1"
          onInput={(e) => setZRot(parseFloat(e.target.value))}
        />
        <label for="z_rot">Z Rot</label>
      </div>
    </div>
  );
}
