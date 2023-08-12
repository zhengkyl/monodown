import { clientOnly } from "solid-start/islands";

const MC = clientOnly(() => import("~/components/multiple-choice"));

export default function Home() {
  return (
    <main>
      <MC />
    </main>
  );
}
