import { Title } from "@solidjs/meta";
import { css } from "styled-system/css";
import Quiz from "~/components/Quiz";
import { Button } from "~/components/ui/Button";

export default function Home() {
  return (
    <main class={css({})}>
      <Title>Daily</Title>
      <Quiz />
    </main>
  );
}
