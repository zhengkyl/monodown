// @refresh reload
import "./index.css";

import { createSignal } from "solid-js";

import { SelectedProvider } from "~/lib/selected";
import { Chart } from "~/components/Chart";
import { Game } from "~/components/Game";

export default function App() {
  const [stage, setStage] = createSignal(0);

  const onStart = () => setStage(1);
  const onEnd = () => setStage(0);

  return (
    <SelectedProvider>
      {stage() == 0 ? <Chart onStart={onStart} /> : <Game onEnd={onEnd} />}
    </SelectedProvider>
  );
}
