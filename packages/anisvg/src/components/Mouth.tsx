import { createEffect, createSignal } from "solid-js";
import { tweenPath, parsePath, pathToString } from "../util/parsePath";

type Props = {
  svg: SVGSVGElement;
};

export function Mouth(props: Props) {
  const mouthShapes = props.svg.querySelector('[data-label="Mouth"]');
  const shapeInfo = {};
  for (const child of mouthShapes.children) {
    const shape = child.getAttribute("data-label");
    shapeInfo[shape] = {};
    child.classList.add("hidden");
    for (const element of child.children) {
      const label = element.getAttribute("data-label");
      const path = parsePath(element.getAttribute("d"));
      shapeInfo[shape][label] = path;
    }
  }

  const mouth = mouthShapes.children[0];
  mouth.classList.remove("hidden");

  let openSlider;
  let smileSlider;

  const [openValue, setOpenValue] = createSignal(0);
  const [expressionValue, setExpressionValue] = createSignal(0);

  createEffect(() => {
    for (const element of mouth.children) {
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
