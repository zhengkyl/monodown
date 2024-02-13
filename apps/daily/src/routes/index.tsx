import { Title } from "@solidjs/meta";
import { Flame } from "lucide-solid";
import { css } from "styled-system/css";
import { CalendarChart } from "~/components/CalendarChart";
import { Button } from "~/components/ui/Button";
import { getStreak, useUser } from "~/lib/user";

export default function Home() {
  const { days } = useUser();

  const streak = () => getStreak(days);

  return (
    <main class={css({})}>
      <Title>Monono</Title>
      <div class={css({ p: 4, display: "flex" })}>
        <div
          class={css({
            fontWeight: "bold",
            fontSize: "2xl",
            // border: "",
            borderWidth: 1,
            borderRadius: "md",
            display: "flex",
            alignItems: "center",
            p: 2,
          })}
        >
          <span class={css({ pl: 2 })}>{streak()}</span>
          <Flame />
        </div>
      </div>
      <CalendarChart days={days} />
      <Button colorPalette="grass">Daily</Button>
    </main>
  );
}
