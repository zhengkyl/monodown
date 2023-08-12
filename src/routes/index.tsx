import { Title } from "solid-start";
import { MC } from "~/components/multiple-choice";
import { Button } from "~/components/ui/Button";

export default function Home() {
  return (
    <main>
      <Title>Monodown</Title>
      <MC />
    </main>
  );
}
