import { Show, createSignal } from "solid-js";
import monaUrl from "../mona.min.svg";

import "external-svg-loader";
import { Irises } from "./components/Irises";
import { Mouth } from "./components/Mouth";
import { Eyes } from "./components/Eyes";
import { Brows } from "./components/Brows";
import { Whole } from "./components/Whole";

export function App() {
  let svg: SVGSVGElement;

  const [loaded, setLoaded] = createSignal(false);
  window.addEventListener("iconload", () => setLoaded(true));

  return (
    <main class="m-8">
      <div class="flex flex-wrap">
        <div class="flex-1">
          <svg ref={svg} data-src={monaUrl} data-cache="disabled"></svg>
        </div>
        <div class="flex-1">
          <Show when={loaded()} fallback={<p>loading...</p>}>
            <h2>Eyes</h2>
            <Brows svg={svg} />
            <Eyes svg={svg} />
            <Irises svg={svg} />
            <h2>Mouth</h2>
            <Mouth svg={svg} />
            <h2>Whole Rotation</h2>
            <Whole svg={svg} />
          </Show>
        </div>
      </div>
    </main>
  );
}
