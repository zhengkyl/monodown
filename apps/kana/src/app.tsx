// @refresh reload
import { createSignal } from "solid-js";
import "./index.css";
import { css } from "../styled-system/css";
import { Button } from "~/components/button";

export default function App() {
  const [count, setCount] = createSignal(0);

  return (
    <main class={css({ fontSize: "2xl" })}>
      <h1>Hello world!</h1>
      <button class="increment" onClick={() => setCount(count() + 1)}>
        Clicks: {count()}
      </button>
      <Button>Click me</Button>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
