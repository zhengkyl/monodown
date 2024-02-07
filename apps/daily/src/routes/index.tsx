import { Title } from "@solidjs/meta";
import { Flame } from "lucide-solid";
import { css } from "styled-system/css";
import Quiz from "~/components/Quiz";
import { Button } from "~/components/ui/Button";
import { getStreak, useUser } from "~/lib/user";

export default function Home() {
  const { days } = useUser();

  const streak = () => getStreak(days);

  return (
    <main class={css({})}>
      <Title>Monono</Title>
      <div>
        <div>{streak()}</div>
        <Flame />
      </div>
    </main>
  );
}
