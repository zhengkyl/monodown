import { onMount } from "solid-js";
import EarthSVG from "../assets/svg/earth.min.svg";

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      makeDraggable;
    }
  }
}
function makeDraggable(el: HTMLElement, accessor) {
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

  const start = (e: PointerEvent) => {
    if (e.button !== 0) return; // main/left click
    el.setPointerCapture(e.pointerId);
    dragging = true;

    accessor()?.onStart?.(e.clientX - originX, e.clientY - originY);
  };

  const end = () => {
    dragging = false;
    accessor()?.onEnd?.();
  };

  const move = (e) => {
    if (!dragging) return;
    accessor()?.onMove?.(e.clientX - originX, e.clientY - originY);
  };

  el.addEventListener("pointerdown", start);
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener("pointermove", move);
  el.addEventListener("touchstart", (e) => e.preventDefault());
}

export function Planet() {
  let svg: SVGSVGElement;

  let surface: SVGGElement;
  let clouds: SVGGElement;

  onMount(() => {
    surface = svg.querySelector('[data-label="surface"]');
    clouds = svg.querySelector('[data-label="clouds"]');

    surface.style.transformOrigin = "center";

    clouds.classList.add("animate-[spin_240s_linear_infinite]");
    clouds.style.transformOrigin = "center";

    frameTime = performance.now();
    requestAnimationFrame(frame);
  });

  const defaultVel = Math.PI / 60_000; // 120s per spin

  let frameRad = 0;
  let frameVel = defaultVel;
  let frameTime;

  const pi2 = Math.PI * 2;

  const reboundRad = (rad) => {
    if (rad > -pi2 && rad < pi2) {
      return rad;
    }
    return rad % pi2;
  };

  const frame = (time) => {
    const elapsed = time - frameTime;

    if (dragging) {
      const targetRad = initRad + radSum;
      const diff = targetRad - frameRad;

      const targetVel = diff / 300;
      frameVel += (targetVel - frameVel) / 2;
    } else if (Math.abs(frameVel - defaultVel) < 0.0001) {
      frameVel = defaultVel;
      radSum = 0;
    } else {
      const decay = 0.000001 * elapsed;
      radSum *= 0.95;
      if (frameVel > defaultVel) {
        frameVel -= decay;
      } else if (frameVel < defaultVel) {
        frameVel += decay;
      }
    }

    frameRad = frameRad + frameVel * elapsed;
    const boundedFrameRad = reboundRad(frameRad);
    if (dragging) {
      initRad += boundedFrameRad - frameRad;
    }
    frameRad = boundedFrameRad;

    surface.style.rotate = `${frameRad}rad`;

    frameTime = time;
    requestAnimationFrame(frame);
  };

  let dragging = false;
  let initRad;
  let radSum = 0;
  let oldMoveRad;

  return (
    <div class="overflow-hidden ">
      {/* div is temp wrapper b/c can't use directive on transformed code (svg comp) */}
      <div
        class="translate-y-1/2"
        // @ts-expect-error idk what is different, type is correct in anisvg
        use:makeDraggable={{
          onStart: (x, y) => {
            const initDeg = parseFloat(
              getComputedStyle(surface).rotate.slice(0, -3)
            );
            initRad = (initDeg * Math.PI) / 180;

            oldMoveRad = Math.atan2(y, x);
          },
          onMove: (x, y) => {
            dragging = true;
            const newMoveRad = Math.atan2(y, x);
            let diff = newMoveRad - oldMoveRad;

            if (diff > Math.PI) {
              diff -= pi2;
            } else if (diff < -Math.PI) {
              diff += pi2;
            }
            radSum += diff;

            oldMoveRad = newMoveRad;
          },
          onEnd: () => {
            dragging = false;
          },
        }}
      >
        <EarthSVG ref={svg} />
      </div>
    </div>
  );
}
