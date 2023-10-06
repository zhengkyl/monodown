import { parsePath } from "./path";

export function animatePaths(shapesEl: SVGElement) {
  const shapeInfo = {};
  for (const child of shapesEl.children) {
    const shapeLabel = child.getAttribute("data-label");
    shapeInfo[shapeLabel] = {};
    child.classList.add("hidden");
    for (const el of child.children) {
      const elLabel = el.getAttribute("data-label");
      const path = parsePath(el.getAttribute("d"));
      shapeInfo[shapeLabel][elLabel] = path;
    }
  }

  const shape = shapesEl.children[0];
  shape.classList.remove("hidden");

  return {
    shape,
    shapeInfo,
  };
}
