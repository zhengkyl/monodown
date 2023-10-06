import { createEffect, createSignal } from "solid-js";
import { tweenPath, pathToString } from "../util/path";
import { animatePaths } from "../util/animatePaths";

type Props = {
  svg: SVGSVGElement;
};

export function Mouth(props: Props) {
  const { shape, shapeInfo } = animatePaths(
    props.svg.querySelector('[data-label="Mouth"]')
  );

  let openSlider;
  let smileSlider;

  const [openValue, setOpenValue] = createSignal(0);
  const [expressionValue, setExpressionValue] = createSignal(0);

  createEffect(() => {
    for (const element of shape.children) {
      const label = element.getAttribute("data-label");

      const basePath = tweenPath(
        shapeInfo["closed"][label],
        shapeInfo["open"][label],
        openValue()
      );

      const finalPath = tweenPath(
        basePath,
        shapeInfo["smile"][label],
        expressionValue()
      );

      element.setAttribute("d", pathToString(finalPath));
    }
  });

  return (
    <div>
      <div>
        <input
          ref={openSlider}
          type="range"
          id="open"
          name="Open"
          value="0"
          min="0"
          max="1"
          step="0.01"
          onInput={(e) => setOpenValue(parseFloat(e.target.value))}
        />
        <label for="open">Open</label>
      </div>
      <div>
        <input
          ref={smileSlider}
          type="range"
          id="smile"
          name="Smile"
          value="0"
          min="0"
          max="1"
          step="0.01"
          onInput={(e) => setExpressionValue(parseFloat(e.target.value))}
        />
        <label for="smile">Smile</label>
      </div>
    </div>
  );
}
