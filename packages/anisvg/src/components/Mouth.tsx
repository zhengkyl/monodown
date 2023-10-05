import { getTweenedPath, parsePath } from "../util/parsePath";

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
  return (
    <div>
      <div>
        <input
          ref={openSlider}
          type="range"
          id="open"
          name="Open"
          min="0"
          max="1"
          step="0.01"
          onInput={(e) => {
            for (const element of mouth.children) {
              const label = element.getAttribute("data-label");

              console.log(
                shapeInfo["closed"][label],
                shapeInfo["open"][label],
                parseFloat(e.target.value)
              );

              const newPath = getTweenedPath(
                shapeInfo["closed"][label],
                shapeInfo["open"][label],
                parseFloat(e.target.value)
              );
              console.log(newPath);
              element.setAttribute("d", newPath);
            }
          }}
        />
        <label for="open">Open</label>
      </div>
    </div>
  );
}
