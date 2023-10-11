import { onMount } from "solid-js";
import EarthSVG from "../assets/svg/earth.min.svg";

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      makeSpinnable;
    }
  }
}
function makeSpinnable(el: HTMLElement, accessor) {
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

  // let angle = 0;

  let surface: SVGGElement;
  let clouds: SVGGElement;

  onMount(() => {
    surface = svg.querySelector('[data-label="surface"]');
    clouds = svg.querySelector('[data-label="clouds"]');

    surface.classList.add("animate-[spin_120s_linear_infinite]");
    surface.style.transformOrigin = "center";

    clouds.classList.add("animate-[spin_240s_linear_infinite]");
    clouds.style.transformOrigin = "center";

    // requestAnimationFrame(frame);
  });

  // let prevTime = performance.now();

  // const frame = (time) => {
  //   const diff = time - prevTime;
  //   angle += (diff / 1000) * 5;
  //   prevTime = time;

  //   surface.style.rotate = `${angle}deg`;
  //   surface.style.rotate = `${angle}deg`;

  //   clouds.style.rotate = `${angle / 2}deg`;

  //   requestAnimationFrame(frame);
  // };

  let startRad;
  let startDeg;
  return (
    <div class="overflow-hidden ">
      {/* div is temp wrapper b/c can't use directive on transformed code (svg comp) */}
      <div
        class="translate-y-1/2"
        // @ts-expect-error idk what is different, type is correct in anisvg
        use:makeSpinnable={{
          onStart: (x, y) => {
            const startAngle = getComputedStyle(surface).rotate;
            startDeg = parseFloat(startAngle.slice(0, -3));
            surface.classList.remove("animate-[spin_120s_linear_infinite]");
            surface.style.rotate = startAngle;
            startRad = Math.atan2(y, x);
          },
          onMove: (x, y) => {
            const newRad = Math.atan2(y, x);
            const radDiff = newRad - startRad;
            const degDiff = (radDiff * 180) / Math.PI;

            surface.style.rotate = `${startDeg + degDiff}deg`;
          },
          onEnd: () => {},
        }}
      >
        <EarthSVG ref={svg} />
      </div>
    </div>
  );
}
