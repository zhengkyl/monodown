import { Button } from "~/components/ui/Button";
import { createSignal, onMount } from "solid-js";
import { StrokeAnimator } from "~/util/strokeAnimator";
import ASVG from "~/assets/kana/あ.svg";

export function StrokeDiagram() {
  let svg: SVGSVGElement;

  const [animator, setAnimator] = createSignal<StrokeAnimator>();

  onMount(() => {
    setAnimator(new StrokeAnimator(svg));
  });

  return (
    <div>
      <Button onClick={() => animator()?.animatePath()}>Animate</Button>
      <ASVG ref={svg} height="100px" width="100px" />
    </div>
  );
}
