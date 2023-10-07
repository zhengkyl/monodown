import { parsePath } from "./path";

export function animatePaths(shapesEl: SVGElement) {
  const shapeInfo = {};
  for (const child of shapesEl.children) {
    const shapeLabel = child.getAttribute("data-label");
    shapeInfo[shapeLabel] = {};
    // @ts-expect-error shut up
    child.style.display = "none";
    for (const el of child.children) {
      const elLabel = el.getAttribute("data-label");
      const path = parsePath(el.getAttribute("d"));
      shapeInfo[shapeLabel][elLabel] = path;
    }
  }

  const shape = shapesEl.children[0];
  // @ts-expect-error shut up
  shape.style.display = "";

  return {
    shape,
    shapeInfo,
  };
}
