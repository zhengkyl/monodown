import { animatePaths } from "../util/animatePaths";
import { tweenPath, pathToString } from "../util/path";

type Props = {
  svg: SVGSVGElement;
};

export function Eyes(props: Props) {
  let leftSlider: HTMLInputElement;
  let rightSlider: HTMLInputElement;

  return (
    <div>
      <div>
        <input
          type="range"
          id="eyes_open"
          name="Eyes Open"
          value="0"
          min="0"
          max="1"
          step="0.01"
          onInput={(e) => {
            leftSlider.value = e.target.value;
            rightSlider.value = e.target.value;
            leftSlider.dispatchEvent(
              new Event("input", {
                bubbles: true,
                cancelable: true,
              })
            );
            rightSlider.dispatchEvent(
              new Event("input", {
                bubbles: true,
                cancelable: true,
              })
            );
          }}
        />
        <label for="eye_open">Both Open</label>
      </div>
      <Eye svg={props.svg} side="left" ref={leftSlider} />
      <Eye svg={props.svg} side="right" ref={rightSlider} />
    </div>
  );
}

type EyeProps = {
  svg: SVGSVGElement;
  side: "left" | "right";
  ref: HTMLInputElement;
};

function Eye(props: EyeProps) {
  const { shape: featShape, shapeInfo: featShapeInfo } = animatePaths(
    props.svg.querySelector(
      `[data-label="eye_${props.side}"] > [data-label="features"]`
    )
  );

  const { shape: whiteShape, shapeInfo: whiteShapeInfo } = animatePaths(
    props.svg.querySelector(
      `[data-label="eye_${props.side}"] > [data-label="whites"]`
    )
  );

  return (
    <div>
      <input
        ref={props.ref}
        type="range"
        id={`${props.side}_open`}
        name={`${props.side} eye`}
        value="0"
        min="0"
        max="1"
        step="0.01"
        onInput={(e) => {
          for (const element of featShape.children) {
            const label = element.getAttribute("data-label");

            const basePath = tweenPath(
              featShapeInfo["closed"][label],
              featShapeInfo["open"][label],
              parseFloat(e.target.value)
            );

            element.setAttribute("d", pathToString(basePath));
          }
          for (const element of whiteShape.children) {
            const label = element.getAttribute("data-label");

            const basePath = tweenPath(
              whiteShapeInfo["closed"][label],
              whiteShapeInfo["open"][label],
              parseFloat(e.target.value)
            );

            element.setAttribute("d", pathToString(basePath));
          }
        }}
      />
      <label for={`${props.side}_open`}>{props.side} Open</label>
    </div>
  );
}
