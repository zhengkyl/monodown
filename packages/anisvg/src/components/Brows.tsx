import { animatePaths } from "../util/animatePaths";
import { tweenPath, pathToString } from "../util/path";

type Props = {
  svg: SVGSVGElement;
};

export function Brows(props: Props) {
  let leftSlider: HTMLInputElement;
  let rightSlider: HTMLInputElement;

  return (
    <div>
      <div>
        <input
          type="range"
          id="brows_up"
          name="Brows up"
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
        <label for="brows_up">Both up</label>
      </div>
      <Brow svg={props.svg} side="left" ref={leftSlider} />
      <Brow svg={props.svg} side="right" ref={rightSlider} />
    </div>
  );
}

type EyeProps = {
  svg: SVGSVGElement;
  side: "left" | "right";
  ref: HTMLInputElement;
};

function Brow(props: EyeProps) {
  const { shape: featShape, shapeInfo: featShapeInfo } = animatePaths(
    props.svg.querySelector(`[data-label="brow_${props.side}"]`)
  );

  const { shape: whiteShape, shapeInfo: whiteShapeInfo } = animatePaths(
    props.svg.querySelector(`[data-label="brow_${props.side}"]`)
  );

  return (
    <div>
      <input
        ref={props.ref}
        type="range"
        id={`${props.side}_up`}
        name={`${props.side} brow`}
        value="0"
        min="0"
        max="1"
        step="0.01"
        onInput={(e) => {
          for (const element of featShape.children) {
            const label = element.getAttribute("data-label");

            const basePath = tweenPath(
              featShapeInfo["down"][label],
              featShapeInfo["up"][label],
              parseFloat(e.target.value)
            );

            element.setAttribute("d", pathToString(basePath));
          }
          for (const element of whiteShape.children) {
            const label = element.getAttribute("data-label");

            const basePath = tweenPath(
              whiteShapeInfo["down"][label],
              whiteShapeInfo["up"][label],
              parseFloat(e.target.value)
            );

            element.setAttribute("d", pathToString(basePath));
          }
        }}
      />
      <label for={`${props.side}_up`}>{props.side} up</label>
    </div>
  );
}
