import { onMount } from "solid-js";

// https://www.redblobgames.com/making-of/draggable/
export function makeDraggable(el: HTMLElement, accessor) {
  const getElCenter = () => {
    const rect = el.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  };

  let dragging = false;

  let originX;
  let originY;

  onMount(() => {
    const { x, y } = getElCenter();
    originX = x;
    originY = y;
  });

  // maintain pointer offset from center of draggable
  let offsetX;
  let offsetY;
  const start = (e: PointerEvent) => {
    if (e.button !== 0) return; // main/left click
    el.setPointerCapture(e.pointerId);
    dragging = true;
    const { x, y } = getElCenter();
    offsetX = e.clientX - x;
    offsetY = e.clientY - y;
    accessor()?.onStart?.();
  };

  const end = () => {
    dragging = false;
    accessor()?.onEnd?.();
  };

  const move = (e) => {
    if (!dragging) return;
    accessor()?.onMove?.(
      e.clientX - offsetX - originX,
      e.clientY - offsetY - originY
    );
  };

  el.addEventListener("pointerdown", start);
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener("pointermove", move);
  el.addEventListener("touchstart", (e) => e.preventDefault());
}
